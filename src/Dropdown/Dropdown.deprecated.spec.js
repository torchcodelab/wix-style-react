import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import dropdownDriverFactory from './Dropdown.driver';
import Dropdown from './Dropdown';
import { dropdownTestkitFactory } from '../../testkit';
import { dropdownTestkitFactory as enzymeDropdownTestkitFactory } from '../../testkit/enzyme';
import { mount } from 'enzyme';
import { sleep } from 'wix-ui-test-utils/react-helpers';
import { createRendererWithDriver, cleanup } from '../../test/utils/unit';
import { depLogger } from '../utils/deprecationLog';

describe('Dropdown (Deprecated mode)', () => {
  const render = createRendererWithDriver(dropdownDriverFactory);
  const createDriver = jsx => render(jsx).driver;

  const getOptions = () => [
    { id: 0, value: 'Option 1' },
    { id: 1, value: 'Option 2' },
    { id: 2, value: 'Option 3', disabled: true },
    { id: 3, value: 'Option 4' },
    { id: 'divider1', value: '-' },
    { id: 'element1', value: <span style={{ color: 'brown' }}>Option 4</span> },
  ];

  afterEach(() => {
    cleanup();
  });

  it('should select item with selectedId on init state', () => {
    const { inputDriver, dropdownLayoutDriver } = createDriver(
      <Dropdown options={getOptions()} selectedId={0} />,
    );

    expect(dropdownLayoutDriver.isOptionSelected(0)).toBeTruthy();
    expect(inputDriver.getValue()).toBe('Option 1');
  });

  it('should select an item when clicked', () => {
    const { driver, dropdownLayoutDriver } = createDriver(
      <Dropdown options={getOptions()} />,
    );
    driver.focus();
    dropdownLayoutDriver.clickAtOption(0);
    expect(dropdownLayoutDriver.isOptionSelected(0)).toBeTruthy();
  });

  it('should enter the selected option text when selected', () => {
    const { driver, inputDriver, dropdownLayoutDriver } = createDriver(
      <Dropdown options={getOptions()} />,
    );
    driver.focus();
    dropdownLayoutDriver.clickAtOption(0);
    expect(inputDriver.getValue()).toBe('Option 1');
  });

  it('should update text when selected option changes', () => {
    const options = getOptions();
    const dataHook = 'dropdown-comp';

    const { driver: dropdownDriver, rerender } = render(
      <Dropdown dataHook={dataHook} options={options} selectedId={0} />,
    );
    const { driver, inputDriver, dropdownLayoutDriver } = dropdownDriver;

    driver.focus();
    dropdownLayoutDriver.clickAtOption(0);
    expect(inputDriver.getValue()).toBe('Option 1');

    options[0].value = 'Updated';
    rerender(<Dropdown dataHook={dataHook} options={options} selectedId={0} />);

    expect(inputDriver.getValue()).toBe('Updated');
  });

  it('should close when clicking on input (header)', () => {
    const { dropdownLayoutDriver, inputDriver } = createDriver(
      <Dropdown options={getOptions()} />,
    );
    inputDriver.click();
    expect(dropdownLayoutDriver.isShown()).toBeTruthy();

    return sleep(200).then(() => {
      inputDriver.click();
      expect(dropdownLayoutDriver.isShown()).toBeFalsy();
    });
  });

  it('should be read only', () => {
    const { driver } = createDriver(<Dropdown options={getOptions()} />);
    expect(driver.isReadOnly()).toBeTruthy();
  });

  describe('upgrade deprecation log', () => {
    let consoleErrorSpy;

    beforeEach(() => {
      consoleErrorSpy = jest
        .spyOn(global.console, 'error')
        .mockImplementation(jest.fn());
    });
    afterEach(() => {
      consoleErrorSpy.mockRestore();
    });

    describe('without upgrade', () => {
      let depLogSpy;

      beforeEach(() => {
        depLogSpy = jest.spyOn(depLogger, 'log');
      });

      afterEach(() => depLogSpy.mockRestore());

      it(`should show deprecationLog when 'upgrade' is not true`, () => {
        render(<Dropdown options={getOptions()} />);
        expect(depLogSpy).toBeCalledWith(
          `Dropdown: New API! Please upgrade by passing the prop 'upgrade=true', and refer to documentation.`,
        );
      });

      it('should log error when initialSelectedId is used without upgrade', () => {
        render(<Dropdown options={getOptions()} initialSelectedId={0} />);
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toBeCalledWith(
          expect.stringContaining(
            `'initialSelectedId' can be used only if you pass 'upgrade=true' as well.`,
          ),
        );
      });
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(
        ReactTestUtils.renderIntoDocument(
          <div>
            <Dropdown dataHook={dataHook} />
          </div>,
        ),
      );
      const dropdownTestkit = dropdownTestkitFactory({ wrapper, dataHook });
      expect(dropdownTestkit.driver.exists()).toBeTruthy();
      expect(dropdownTestkit.inputDriver.exists()).toBeTruthy();
      expect(dropdownTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Dropdown dataHook={dataHook} />);
      const dropdownTestkit = enzymeDropdownTestkitFactory({
        wrapper,
        dataHook,
      });
      expect(dropdownTestkit.driver.exists()).toBeTruthy();
      expect(dropdownTestkit.inputDriver.exists()).toBeTruthy();
      expect(dropdownTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
    });
  });
});
