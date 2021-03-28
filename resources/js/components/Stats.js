import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Card, Avatar, Pagination} from 'antd';
import {Navbar, Container} from 'react-bootstrap';
import LineChart from '../components/LineChart';

const {Meta} = Card;
const pageSize = 9;

class Stats extends React.Component {

    state = {
        users: [],
        page: 1,
        total: 0,
        fetching: false
    };

    componentDidMount() {
        this.fetch();
    }

    fetch = () => {
        this.setState({fetching: true});
        axios.get(`/api/stats?page=${this.state.page}&size=${pageSize}`)
            .then(({data}) => this.setState({users: data.data, total: data.total}))
            .catch(err => console.log(err))
            .then(() => this.setState({fetching: false}));
    };

    render() {
        const {users, fetching} = this.state;

        return <React.Fragment>
            <Navbar collapseOnSelect fixed="top">
                <Container>
                    <Navbar.Toggle/>
                </Container>
            </Navbar>
            <div className="row">
                {users.map(user => {
                    return <div className="col-md-4">
                        <Card loading={fetching} className="m-2">
                            <Meta avatar={<Avatar src={user.avatar}>{user.name.charAt(0)}</Avatar>}
                                  title={user.name}
                                  description={user.occupation}/>
                            <div className="row mt-1">
                                <div className="col-md-9">
                                    <LineChart chartData={user.chartData}/>
                                </div>
                                <div className="col-md-3">
                                    <div className="float-right text-right">
                                        <strong>{user.impressions}</strong><br/><span
                                        className="text-muted">impressions</span><br/>
                                        <strong>{user.conversions}</strong><br/><span
                                        className="text-muted">conversions</span><br/>
                                        <strong>${user.revenue}</strong><br/><span className="text-muted">revenue</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                })}
            </div>
            <Pagination className="float-right m-2"
                        defaultCurrent={1}
                        pageSize={pageSize}
                        total={this.state.total}
                        showSizeChanger={false}
                        onChange={page => this.setState({page}, this.fetch)}
            />
        </React.Fragment>
    }
}

export default Stats;

if (document.getElementById('root')) {
    ReactDOM.render(<Stats/>, document.getElementById('root'));
}
