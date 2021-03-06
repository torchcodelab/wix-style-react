import dropdownLayoutDriverFactory from '../DropdownLayout/DropdownLayout.driver';
import ReactTestUtils from 'react-dom/test-utils';
import { isClassExists } from '../../test/utils';

const IconWithOptionsDriverFactory = ({ element }) => {
  const iconWrapper = element.querySelector('[data-hook=icon-wrapper]');
  const dropdownLayoutWrapper = element.querySelector(
    '[data-hook=iconWithOptions-dropdownLayout-wrapper]',
  );
  const dropdownLayout = element.querySelector(
    '[data-hook=iconWithOptions-dropdownLayout]',
  );
  const dropdownLayoutDriver = dropdownLayoutDriverFactory({
    element: dropdownLayout,
  });

  const driver = {
    exists: () => !!element,
    mouseEnter: () => ReactTestUtils.Simulate.mouseEnter(iconWrapper),
    mouseLeave: () => ReactTestUtils.Simulate.mouseLeave(element),
    isIconBlue: () => isClassExists(element, 'hover'),
    iconWrapper: () => iconWrapper,
    element: () => element,
  };

  return {
    driver,
    dropdownLayoutDriver: {
      ...dropdownLayoutDriver,
      isDropDirectionUp: () =>
        dropdownLayoutDriver.isUp() &&
        isClassExists(dropdownLayoutWrapper, 'dropDirectionUp'),
    },
  };
};

export default IconWithOptionsDriverFactory;
