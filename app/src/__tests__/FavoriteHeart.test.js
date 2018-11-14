import React from 'react';
import FavoriteHeart from '../Components/FavoriteHeart';
import renderer from 'react-test-renderer'


describe('Snapshot test of FavoriteHeart', ()=> {
    it('renders correctly', () => {
        const tree = renderer
            .create(<FavoriteHeart isFav="True"/>)
            .toJSON();
        expect(tree).toMatchSnapshot()
    })
});