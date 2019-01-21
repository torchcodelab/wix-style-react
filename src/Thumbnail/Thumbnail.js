import React from 'react';
import PropTypes from 'prop-types';
import styles from './Thumbnail.st.css';

import Check from 'wix-ui-icons-common/Check';
import Text from '../Text';

const noop = () => {};
const isString = a => typeof a === 'string';

/**
 * # Thumbnail
 * Component for showing thumbnails
 *
 * It takes full space of parent component, works well together with `<Proportion/>`
 * */
class Thumbnail extends React.PureComponent {
  static displayName = 'Thumbnail';

  static propTypes = {
    dataHook: PropTypes.string,

    /** Title node */
    title: PropTypes.node,

    /** Description node */
    description: PropTypes.node,

    /** Image to display in thumbnail.
     * If given as string, it will be used within `<img/>`.
     * Otherwise can be given as React.Node
     */
    image: PropTypes.node,

    /** Thumbnail size */
    size: PropTypes.oneOf(['tiny', 'small', 'medium']),

    /** Set selected state of thumbnail */
    selected: PropTypes.bool,

    /** Set disabled state of thumbnail */
    disabled: PropTypes.bool,

    /** Hide icon when thumbnail is selected */
    hideSelectedIcon: PropTypes.bool,

    /** Overrides title, description and image properties */
    backgroundImage: PropTypes.node,

    /** Callback function for onClick event */
    onClick: PropTypes.func,
  };

  static defaultProps = {
    size: 'medium',
    selected: false,
    disabled: false,
  };

  renderBackgroundLayout = () =>
    isString(this.props.backgroundImage) ? (
      <div
        className={styles.backgroundImage}
        data-hook="thumbnail-background-image"
        style={{ backgroundImage: `url(${this.props.backgroundImage})` }}
      />
    ) : (
      this.props.backgroundImage
    );

  renderNoBackgroundLayout = () => {
    const { title, description, image, size } = this.props;

    return (
      <div className={styles.noBackgroundWrapper}>
        {image && (
          <div
            className={styles.image}
            data-hook="thumbnail-image"
            children={isString(image) ? <img src={image} /> : image}
          />
        )}

        {title && (
          <Text
            className={styles.title}
            data-hook="thumbnail-title"
            size={size}
            tagName="div"
            weight="normal"
            children={title}
          />
        )}

        {description && (
          <Text
            className={styles.description}
            data-hook="thumbnail-description"
            size={size}
            weight="thin"
            tagName="div"
            secondary
            children={description}
          />
        )}
      </div>
    );
  };

  renderSelectedIcon = () => (
    <div className={styles.selectedIcon} data-hook="thumbnail-selected-icon">
      <Check size="24" />
    </div>
  );

  render() {
    const {
      dataHook,
      size,
      selected,
      disabled,
      backgroundImage,
      onClick,
      hideSelectedIcon,
    } = this.props;

    const hasBackground = !!backgroundImage;

    return (
      <div
        {...styles(
          'root',
          { selected, disabled, size, hasBackground },
          this.props,
        )}
        data-hook={dataHook}
        onClick={disabled ? noop : onClick}
      >
        {!hideSelectedIcon && selected && this.renderSelectedIcon()}
        {hasBackground && this.renderBackgroundLayout()}
        {!hasBackground && this.renderNoBackgroundLayout()}
      </div>
    );
  }
}

export default Thumbnail;
