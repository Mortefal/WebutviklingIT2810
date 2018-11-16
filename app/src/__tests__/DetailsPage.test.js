import React from 'react';
import DetailsPage from '../Containers/DetailsPage';
import renderer from 'react-test-renderer'


describe('Snapshot test of DetailsPage', ()=> {
    it('renders correctly', () => {
        const tree = renderer
            .create(<DetailsPage title="Test" isFav="True" aroma="røyk" country="England" taste="noe" abv={12}/>)
            .toJSON();
        expect(tree).toMatchSnapshot()
    })
});
