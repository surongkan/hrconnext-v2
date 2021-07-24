import { Radio, Input, Space } from 'antd';

class Test extends React.Component {
  state = {
    selected: 1,
  };

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      selected: e.target.value,
    });
  };

  render() {
    const { selected } = this.state;

    return (
      <>
        <Radio.Group onChange={this.onChange} value={selected}>
          <Space direction="vertical">
            <Radio value={1}>Option A</Radio>
            <Radio value={2}>Option B</Radio>
            <Radio value={4}>
              More...
              {selected === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
            </Radio>
          </Space>

        </Radio.Group>
        <div>
          {selected === 1 ?
            <Input style={{ width: 100, marginLeft: 10 }} /> : <div>ABC</div>}
        </div>
      </>
    );
  }
}
export default Test;

