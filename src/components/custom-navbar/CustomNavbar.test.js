import { render } from "@testing-library/react";
import { CustomNavbar } from './CustomNavbar';

jest.mock('@aws-amplify/ui-react', () => ({
    ComponentClassNames: {
      DROPDOWN: 'dropdown',
    },
  }));

  jest.mock('aws-amplify', () => ({
    Auth: {
      user: { username: 'mocked-username' },
    },
  }));
describe("(Snapshot) Default",  () => {
    it('(Snapshot) Default', async () => { 
        const { asFragment } = render(<CustomNavbar />)
        expect(asFragment()).toMatchSnapshot();
    })
})

