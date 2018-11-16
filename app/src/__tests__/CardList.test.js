import React from 'react';
import CardList from '../Components/CardList';
import renderer from 'react-test-renderer'


describe('Snapshot test of CardList', ()=> {
    it('renders correctly', () => {
        const tree = renderer
            .create(<CardList data="data"/>)
            .toJSON();
        expect(tree).toMatchSnapshot()
    })
});
