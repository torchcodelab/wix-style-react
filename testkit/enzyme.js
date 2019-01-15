/* eslint-disable */
/*
 * DO NOT EDIT THIS FILE.
 * YOUR CHANGES WILL BE OVERWRITTEN.
 * FILE IS BASED ON scripts/generate-testkit-exports/templates/enzyme.js
 * AND GENERATED BY scripts/generate-testkit-exports
 */
import {
  enzymeTestkitFactoryCreator,
  enzymeUniTestkitFactoryCreator,
} from 'wix-ui-test-utils/enzyme';

export {
  badgeTestkitFactory,
  stylableCounterBadgeTestkitFactory as counterBadgeTestkitFactory,
  toggleSwitchTestkitFactory,
  labelTestkitFactory,
  floatingHelperTestkitFactory,
  linearProgressBarTestkitFactory,
  circularProgressBarTestkitFactory,
} from 'wix-ui-backoffice/dist/src/testkit/enzyme';

import buttonDriverFactory from '../src/Backoffice/Button/Button.driver';
import { buttonDriverFactory as buttonNextDriverFactory } from '../src/Button/Button.driver';

export const buttonTestkitFactory = obj => {
  const hasUpgrade = obj.wrapper.find('[data-upgrade]').length;

  return hasUpgrade
    ? enzymeUniTestkitFactoryCreator(buttonNextDriverFactory)(obj)
    : enzymeTestkitFactoryCreator(buttonDriverFactory)(obj);
};

const load = path => {
  const item = require(path);

  return item.default
    ? item.default
    : Object.keys(item).length === 1
    ? Object.values(item)[0]
    : item;
};

export const addItemTestkitFactory = enzymeTestkitFactoryCreator(load('../src/AddItem/AddItem.driver'));
export const autoCompleteTestkitFactory = enzymeTestkitFactoryCreator(load('../src/AutoComplete/AutoComplete.driver'));
export const autoCompleteCompositeTestkitFactory = enzymeTestkitFactoryCreator(load('../src/AutoCompleteComposite/AutoCompleteComposite.driver'));
export const avatarTestkitFactory = enzymeUniTestkitFactoryCreator(load('../src/Avatar/Avatar.driver'));
export const badgeSelectTestkitFactory = enzymeTestkitFactoryCreator(load('../src/BadgeSelect/BadgeSelect.driver'));
export const breadcrumbsTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Breadcrumbs/Breadcrumbs.driver'));
export const buttonLayoutTestkitFactory = enzymeTestkitFactoryCreator(load('../src/ButtonLayout/ButtonLayout.driver'));
export const buttonWithOptionsTestkitFactory = enzymeTestkitFactoryCreator(load('../src/ButtonWithOptions/ButtonWithOptions.driver'));
export const calendarTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Calendar/Calendar.driver'));
export const calendarPanelTestkitFactory = enzymeTestkitFactoryCreator(load('../src/CalendarPanel/CalendarPanel.driver'));
export const cardGalleryItemTestkitFactory = enzymeUniTestkitFactoryCreator(load('../src/CardGalleryItem/CardGalleryItem.driver'));
export const carouselTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Carousel/Carousel.driver'));
export const checkboxTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Checkbox/Checkbox.driver'));
export const closeButtonTestkitFactory = enzymeUniTestkitFactoryCreator(load('../src/CloseButton/CloseButton.driver'));
export const colorPickerTestkitFactory = enzymeTestkitFactoryCreator(load('../src/ColorPicker/ColorPicker.driver'));
export const contactItemBuilderTestkitFactory = enzymeTestkitFactoryCreator(load('../src/ContactItemBuilder/ContactItemBuilder.driver'));
export const dataTableTestkitFactory = enzymeTestkitFactoryCreator(load('../src/DataTable/DataTable.driver'));
export const datePickerTestkitFactory = enzymeTestkitFactoryCreator(load('../src/DatePicker/DatePicker.driver'));
export const dropdownTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Dropdown/Dropdown.driver'));
export const dropdownBaseTestkitFactory = enzymeUniTestkitFactoryCreator(load('../src/DropdownBase/DropdownBase.driver'));
export const dropdownCompositeTestkitFactory = enzymeTestkitFactoryCreator(load('../src/DropdownComposite/DropdownComposite.driver'));
export const dropdownLayoutTestkitFactory = enzymeTestkitFactoryCreator(load('../src/DropdownLayout/DropdownLayout.driver'));
export const editableSelectorTestkitFactory = enzymeTestkitFactoryCreator(load('../src/EditableSelector/EditableSelector.driver'));
export const emptyStateTestkitFactory = enzymeTestkitFactoryCreator(load('../src/EmptyState/EmptyState.driver'));
export const endorseContentLayoutTestkitFactory = enzymeTestkitFactoryCreator(load('../src/EndorseContentLayout/EndorseContentLayout.driver'));
export const filePickerTestkitFactory = enzymeTestkitFactoryCreator(load('../src/FilePicker/FilePicker.driver'));
export const formFieldTestkitFactory = enzymeTestkitFactoryCreator(load('../src/FormField/FormField.driver'));
export const generatedTestComponentTestkitFactory = enzymeUniTestkitFactoryCreator(load('../src/GeneratedTestComponent/GeneratedTestComponent.driver'));
export const genericModalLayoutTestkitFactory = enzymeTestkitFactoryCreator(load('../src/GenericModalLayout/GenericModalLayout.driver'));
export const googleAddressInputTestkitFactory = enzymeTestkitFactoryCreator(load('../src/GoogleAddressInput/GoogleAddressInput.driver'));
export const googleAddressInputWithLabelTestkitFactory = enzymeTestkitFactoryCreator(load('../src/GoogleAddressInputWithLabel/GoogleAddressInputWithLabel.driver'));
export const headingTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Heading/Heading.driver'));
export const highlighterTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Highlighter/Highlighter.driver'));
export const iconButtonTestkitFactory = enzymeUniTestkitFactoryCreator(load('../src/IconButton/IconButton.driver'));
export const iconWithOptionsTestkitFactory = enzymeTestkitFactoryCreator(load('../src/IconWithOptions/IconWithOptions.driver'));
export const imageViewerTestkitFactory = enzymeTestkitFactoryCreator(load('../src/ImageViewer/ImageViewer.driver'));
export const inputTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Input/Input.driver'));
export const inputAreaTestkitFactory = enzymeTestkitFactoryCreator(load('../src/InputArea/InputArea.driver'));
export const inputWithOptionsTestkitFactory = enzymeTestkitFactoryCreator(load('../src/InputWithOptions/InputWithOptions.driver'));
export const loaderTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Loader/Loader.driver'));
export const modalTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Modal/Modal.driver'));
export const modalSelectorLayoutTestkitFactory = enzymeTestkitFactoryCreator(load('../src/ModalSelectorLayout/ModalSelectorLayout.driver'));
export const multiSelectTestkitFactory = enzymeTestkitFactoryCreator(load('../src/MultiSelect/MultiSelect.driver'));
export const multiSelectCheckboxTestkitFactory = enzymeTestkitFactoryCreator(load('../src/MultiSelectCheckbox/MultiSelectCheckbox.driver'));
export const multiSelectCompositeTestkitFactory = enzymeTestkitFactoryCreator(load('../src/MultiSelectComposite/MultiSelectComposite.driver'));
export const notificationTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Notification/Notification.driver'));
export const pageTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Page/Page.driver'));
export const pageHeaderTestkitFactory = enzymeTestkitFactoryCreator(load('../src/PageHeader/PageHeader.driver'));
export const popoverTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Popover/Popover.driver'));
export const popoverMenuTestkitFactory = enzymeTestkitFactoryCreator(load('../src/PopoverMenu/PopoverMenu.driver'));
export const proportionTestkitFactory = enzymeUniTestkitFactoryCreator(load('../src/Proportion/Proportion.driver'));
export const radioGroupTestkitFactory = enzymeTestkitFactoryCreator(load('../src/RadioGroup/RadioGroup.driver'));
export const rangeTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Range/Range.driver'));
export const richTextAreaTestkitFactory = enzymeTestkitFactoryCreator(load('../src/RichTextArea/RichTextArea.driver'));
export const richTextAreaCompositeTestkitFactory = enzymeTestkitFactoryCreator(load('../src/RichTextAreaComposite/RichTextAreaComposite.driver'));
export const searchTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Search/Search.driver'));
export const sectionHelperTestkitFactory = enzymeTestkitFactoryCreator(load('../src/SectionHelper/SectionHelper.driver'));
export const selectorTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Selector/Selector.driver'));
export const sideMenuTestkitFactory = enzymeTestkitFactoryCreator(load('../src/SideMenu/core/SideMenu.driver'));
export const sideMenuDrillTestkitFactory = enzymeTestkitFactoryCreator(load('../src/SideMenu/DrillView/DrillView.driver'));
export const skeletonTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Skeleton/Skeleton.driver'));
export const sliderTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Slider/Slider.driver'));
export const sortableListTestkitFactory = enzymeTestkitFactoryCreator(load('../src/SortableList/SortableList.driver'));
export const statsWidgetTestkitFactory = enzymeTestkitFactoryCreator(load('../src/StatsWidget/StatsWidget.driver'));
export const tableTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Table/Table.driver'));
export const tableActionCellTestkitFactory = enzymeTestkitFactoryCreator(load('../src/TableActionCell/TableActionCell.driver'));
export const tabsTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Tabs/Tabs.driver'));
export const tagTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Tag/Tag.driver'));
export const textTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Text/Text.driver'));
export const textAreaTestkitFactory = enzymeTestkitFactoryCreator(load('../src/TextArea/TextArea.driver'));
export const textButtonTestkitFactory = enzymeUniTestkitFactoryCreator(load('../src/TextButton/TextButton.driver'));
export const textFieldTestkitFactory = enzymeTestkitFactoryCreator(load('../src/TextField/TextField.driver'));
export const textLinkTestkitFactory = enzymeTestkitFactoryCreator(load('../src/TextLink/TextLink.driver'));
export const timeInputTestkitFactory = enzymeTestkitFactoryCreator(load('../src/TimeInput/TimeInput.driver'));
export const tooltipTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Tooltip/Tooltip.driver'));
export const backofficeTooltipTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Backoffice/Tooltip/Tooltip.driver'));
export const headerTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Card/Header/Header.driver'));
export const draggableTestkitFactory = enzymeTestkitFactoryCreator(load('../src/DragAndDrop/Draggable/Draggable.driver'));
export const editableRowTestkitFactory = enzymeTestkitFactoryCreator(load('../src/EditableSelector/EditableRow/EditableRow.driver'));
export const fieldLabelAttributesTestkitFactory = enzymeTestkitFactoryCreator(load('../src/FieldLabelAttributes/FieldLabelAttributes.driver'));
export const fieldWithSelectionCompositeTestkitFactory = enzymeTestkitFactoryCreator(load('../src/Composite/FieldWithSelectionComposite/FieldWithSelectionComposite.driver'));
export const radioButtonTestkitFactory = enzymeTestkitFactoryCreator(load('../src/RadioGroup/RadioButton/RadioButton.driver'));
export const messageBoxMarketerialLayoutTestkitFactory = enzymeTestkitFactoryCreator(load('../src/MessageBox/MessageBoxMarketerialLayout.driver'));
export const messageBoxFunctionalLayoutTestkitFactory = enzymeTestkitFactoryCreator(load('../src/MessageBox/MessageBoxFunctionalLayout.driver'));
export const textLinkLayoutTestkitFactory = enzymeTestkitFactoryCreator(load('../src/BaseComponents/TextLinkLayout/TextLinkLayout.driver'));