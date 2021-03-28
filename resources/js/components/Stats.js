import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Card, Avatar} from 'antd';

const {Meta} = Card;

class Stats extends React.Component {

    state = {users: []};

    componentDidMount() {
        axios.get('/api/stats')
            .then(res => this.setState({users: res.data}))
            .catch(err => console.log(err));
    }

    render() {
        const {users} = this.state;

        return <div className="row">
            {users.map(user => {
                return <Card className="col-md-3">
                    <Meta avatar={<Avatar src={user.avatar}>{user.name.charAt(0)}</Avatar>}
                          title={user.name}
                          description={user.occupation}/>
                </Card>
            })}
        </div>
    }
}

export default Stats;

if (document.getElementById('root')) {
    ReactDOM.render(<Stats/>, document.getElementById('root'));
}
