import React from 'react';
import SimpleCard from '../Containers/SimpleCard';
import renderer from 'react-test-renderer'

/*
test('SimpleCard renders all its props', ()=> {
    const wrapper = mount(<SimpleCard title="TestTitle" description="TestDescription" pris={123} varenummer={1234567890}/>);

    const p = wrapper.find('.title');
    expect(p.text()).toBe("TestTitle")
})
*/
describe('Snapshot test of SimpleCard', ()=> {
    it('renders correctly', () => {
        const tree = renderer
            .create(<SimpleCard title="Test" description="test test" pris={123} varenummer={123456}/>)
            .toJSON();
        expect(tree).toMatchSnapshot()
    })
});
