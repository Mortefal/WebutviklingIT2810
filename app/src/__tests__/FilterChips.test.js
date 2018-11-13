import React from 'react';
import FilterChips from '../Components/FilterChips';
import renderer from 'react-test-renderer'


describe('Snapshot test of FilterChips', ()=> {
    it('renders correctly', () => {
        const tree = renderer
            .create(<FilterChips/>)
            .toJSON();
        expect(tree).toMatchSnapshot()
    })
});
