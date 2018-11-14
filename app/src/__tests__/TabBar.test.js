import React from 'react';
import TabBar from '../Containers/TabBar';
import renderer from 'react-test-renderer'

describe('Snapshot test of TabBar', ()=> {
    it('renders correctly', () => {
        const tree = renderer
            .create(<TabBar/>)
            .toJSON();
        expect(tree).toMatchSnapshot()
    })
});
