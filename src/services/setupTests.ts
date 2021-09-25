import '@testing-library/jest-dom';

import Enzyme from 'enzyme';
// @ts-ignore: Unreachable code error
import Adapter from 'enzyme-adapter-react-16';

// tslint:disable-next-line:no-any
Enzyme.configure({ adapter: new Adapter() });