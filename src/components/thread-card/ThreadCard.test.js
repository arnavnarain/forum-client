import { render } from "@testing-library/react";
import { ThreadCard } from './ThreadCard';

jest.mock('@aws-amplify/ui-react', () => ({
    Image: ({ src, alt, style }) => (
      <img src={src} alt={alt} style={style} />
    ),
  }));

describe("Thread Card render test",  () => {
    it('(Snapshot) Default', async () => { 
        const { asFragment } = render(<ThreadCard title="Sample Title" content="Sample content" />)
        expect(asFragment()).toMatchSnapshot();
    })
})

