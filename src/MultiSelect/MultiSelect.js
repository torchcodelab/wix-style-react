import React from 'react';
import PropTypes from 'prop-types';
import InputWithOptions, {
  DEFAULT_VALUE_PARSER,
} from '../InputWithOptions/InputWithOptions';
import InputWithTags from './InputWithTags';
import last from 'lodash/last';
import difference from 'difference';
import uniqueId from 'lodash/uniqueId';
import { extendPropTypes, allValidators } from '../utils/propTypes';
import deprecationLog from '../utils/deprecationLog';

class MultiSelect extends InputWithOptions {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.state = { ...this.state, pasteDetected: false };
  }

  _isNewCallbackApi() {
    return this.props.upgrade;
  }

  hideOptions() {
    super.hideOptions();
    this.clearInput();
  }

  onClickOutside() {
    const { value, options, onSelect } = this.props;
    if (!this._isNewCallbackApi()) {
      if (!options.length && value) {
        onSelect([{ id: value.trim(), label: value.trim() }]);
      }
    }
    if (this.state.showOptions) {
      this.hideOptions();
    }
  }

  getUnselectedOptions() {
    const optionIds = this.props.options.map(option => option.id);
    const tagIds = this.props.tags.map(tag => tag.id);
    const unselectedOptionsIds = difference(optionIds, tagIds);
    return this.props.options.filter(option =>
      unselectedOptionsIds.includes(option.id),
    );
  }

  dropdownAdditionalProps() {
    return {
      options: this.getUnselectedOptions().filter(this.props.predicate),
      closeOnSelect: false,
      selectedHighlight: false,
      selectedId: -1,
    };
  }

  closeOnSelect() {
    return false;
  }

  inputAdditionalProps() {
    return {
      inputElement: (
        <InputWithTags
          onReorder={this.props.onReorder}
          maxNumRows={this.props.maxNumRows}
          mode={this.props.mode}
        />
      ),
      onKeyDown: this.onKeyDown,
      delimiters: this.props.delimiters,
      onPaste: this.onPaste,
    };
  }

  onPaste() {
    this.setState({ pasteDetected: true });
  }

  _splitByDelimitersAndTrim(value) {
    const delimitersRegexp = new RegExp(this.props.delimiters.join('|'), 'g');
    return value
      .split(delimitersRegexp)
      .map(str => str.trim())
      .filter(str => str);
  }

  _onChange(event) {
    if (this.state.pasteDetected) {
      const value = event.target.value;
      if (this._isNewCallbackApi()) {
        this.setState({ pasteDetected: false }, () => {
          this.submitValue(value);
        });
      } else {
        this.deprecatedOnChangePaste(value);
      }
    } else {
      this.setState({ inputValue: event.target.value });
      this.props.onChange && this.props.onChange(event);
    }
    // If the input value is not empty, should show the options
    if (event.target.value.trim()) {
      this.showOptions();
    }
  }

  deprecatedOnChangePaste(value) {
    const tags = this._splitByDelimitersAndTrim(value);
    const suggestedOptions = tags.map(tag => {
      const tagObj = this.getUnselectedOptions().find(
        element =>
          this.props.valueParser(element).toLowerCase() === tag.toLowerCase(),
      );
      return tagObj
        ? tagObj
        : { id: uniqueId('customOption_'), value: tag, theme: 'error' };
    });

    this.setState({ pasteDetected: false }, () => {
      this.deprecatedOnSelect(suggestedOptions);
      this.clearInput();
    });
  }

  _onSelect(option) {
    if (this._isNewCallbackApi()) {
      this.onSelect(option);
    } else {
      this.deprecatedOnSelect([option]);
    }
  }

  _onManuallyInput(inputValue) {
    if (this._isNewCallbackApi()) {
      const { value } = this.props;

      // FIXME: InputWithOptions is not updating it's inputValue state when the `value` prop changes.
      // So using `value` here, covers for that bug. (This is tested)
      // BTW: Previously, `value` was used to trigger onSelect, and `inputValue` was used to trigger onManuallyInput. Which is crazy.
      // So now both of them trigger a submit (onManuallyInput).
      const _value =
        (value && value.trim()) || (inputValue && inputValue.trim());

      this.submitValue(_value);

      if (this.closeOnSelect()) {
        this.hideOptions();
      }
    } else {
      this._deprecatedOnManuallyInput(inputValue);
    }
  }

  _deprecatedOnManuallyInput(inputValue) {
    const { value, options } = this.props;
    if (value && value.trim()) {
      if (options.length) {
        const unselectedOptions = this.getUnselectedOptions();
        const visibleOptions = unselectedOptions.filter(this.props.predicate);
        const maybeNearestOption = visibleOptions[0];

        if (maybeNearestOption) {
          this.deprecatedOnSelect([maybeNearestOption]);
        }
      } else {
        this.props.onSelect([{ id: value.trim(), label: value.trim() }]);
      }
    }

    if (inputValue) {
      inputValue = inputValue.trim();
      if (this.closeOnSelect()) {
        this.hideOptions();
      }

      this.submitValue(inputValue);
    }
    this.clearInput();
  }

  getManualSubmitKeys() {
    return ['Enter', 'Tab'].concat(this.props.delimiters);
  }

  onKeyDown(event) {
    const { tags, value, onRemoveTag } = this.props;

    if (
      tags.length > 0 &&
      (event.key === 'Delete' || event.key === 'Backspace') &&
      value.length === 0
    ) {
      onRemoveTag(last(tags).id);
    }

    if (event.key === 'Escape') {
      this.clearInput();
      super.hideOptions();
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  optionToTag({ id, value, tag, theme }) {
    return tag ? { id, ...tag } : { id, label: value, theme };
  }

  onSelect(option) {
    this.clearInput();

    const { onSelect } = this.props;

    if (onSelect) {
      onSelect(this.props.options.find(o => o.id === option.id));
    }

    this.input.focus();
  }

  deprecatedOnSelect(_options) {
    this.clearInput();

    const { onSelect } = this.props;

    if (onSelect) {
      const tags = _options.map(this.optionToTag);
      onSelect(tags);
    }

    this.input.focus();
  }

  submitValue(inputValue) {
    if (!inputValue) {
      return;
    }

    const { onManuallyInput } = this.props;
    if (this._isNewCallbackApi()) {
      const values = this._splitByDelimitersAndTrim(inputValue);
      onManuallyInput && values.length && onManuallyInput(values);
    } else {
      if (onManuallyInput) {
        onManuallyInput(
          inputValue,
          this.optionToTag({
            id: uniqueId('customOption_'),
            value: inputValue,
          }),
        );
      }
    }

    this.clearInput();
  }

  clearInput() {
    this.input.clear();
    if (this.props.onChange) {
      this.props.onChange({ target: { value: '' } });
    }
  }
}

function inputWithOptionsPropTypes() {
  const {
    // The following props are overriden in dropdownAdditionalProps()
    selectedId,
    closeOnSelect,
    selectedHighlight,
    ...rest
  } = InputWithOptions.propTypes;
  return rest;
}

MultiSelect.propTypes = {
  ...inputWithOptionsPropTypes(),
  predicate: PropTypes.func,
  tags: PropTypes.array,
  maxNumRows: PropTypes.number,
  delimiters: PropTypes.array,
  mode: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  onReorder: PropTypes.func,
  /** A callback which is called when the user performs a Submit-Action.
   * Submit-Action triggers are: "Enter", "Tab", [typing any defined delimiters], Paste action.
   * `onManuallyInput(values: Array<string>): void - The array of strings is the result of splitting the input value by the given delimiters */
  onManuallyInput: PropTypes.func,
  /** A callback which is called when the user selects an option from the list.
   * `onSelect(option: Option): void` - Option is the original option from the provided `options` prop.
   */
  onSelect: PropTypes.func,
  /** When `true`, then the latest Callback API will be used. Otherwise, see the Old API under the Deprecated stories. */
  upgrade: PropTypes.bool,
};

extendPropTypes(MultiSelect, {
  valueParser: allValidators(PropTypes.func, (props, propName) => {
    const valueParser = props[propName];
    if (
      valueParser &&
      valueParser !== DEFAULT_VALUE_PARSER &&
      props['upgrade']
    ) {
      return new Error(
        `When 'upgrade' is passed then 'valueParser' will not be used. Please remove the 'valueParser' prop.`,
      );
    }
  }),
  upgrade: allValidators(PropTypes.bool, (props, propName) => {
    if (!props[propName]) {
      deprecationLog(
        `MultiSelect: New API! Please upgrade by passing the prop 'upgrade=true', and refer to documentation.`,
      );
    }
  }),
});

MultiSelect.defaultProps = {
  ...InputWithOptions.defaultProps,
  highlight: true,
  theme: 'tags',
  predicate: () => true,
  tags: [],
  delimiters: [','],
};

export default MultiSelect;
