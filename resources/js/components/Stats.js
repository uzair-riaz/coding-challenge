import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Card, Avatar, Pagination, Spin} from 'antd';
import LineChart from '../components/LineChart';
import Navbar from '../components/Navbar';

const {Meta} = Card;
const pageSize = 9;

const sortFilters = ['Name', 'Impressions', 'Conversions', 'Revenue'];

class Stats extends React.Component {

    state = {
        users: [],
        page: 1,
        total: 0,
        fetching: false,
    };

    componentDidMount() {
        this.fetch();
    }

    fetch = () => {
        const {sortBy} = this.state;
        this.setState({fetching: true});
        axios.get(`/api/stats?${sortBy ? `sortBy=${sortBy}` : ''}&page=${this.state.page}&size=${pageSize}`)
            .then(({data}) => this.setState({users: data.data, total: data.total}))
            .catch(err => console.log(err))
            .then(() => this.setState({fetching: false}));
    };

    onClick = sortBy => {
        if (sortBy !== this.state.sortBy) {
            this.setState({sortBy: sortBy.toLowerCase()}, this.fetch);
        }
    };

    render() {
        const {users, fetching} = this.state;

        return <React.Fragment>
            <Navbar/>
            <ul className="nav nav-pills m-2">
                {sortFilters.map(option => {
                    return <li className="nav-item">
                        <a className={`nav-link ${option.toLowerCase() === this.state.sortBy ? 'active' : ''}`}
                           onClick={() => this.onClick(option)}>{option}</a>
                    </li>
                })}
            </ul>
            <Spin spinning={fetching}>
                <div className="row">
                    {users.map(user => {
                        const dates = Object.keys(user.chartData);

                        return <div className="col-md-4">
                            <Card className="m-2">
                                <Meta avatar={<Avatar src={user.avatar}>{user.name.charAt(0)}</Avatar>}
                                      title={user.name}
                                      description={user.occupation}/>
                                <div className="row mt-1">
                                    <div className="col-md-9">
                                        <LineChart data={user.chartData}/><br/>
                                        <strong>Conversions {dates[0]} - {dates[dates.length - 1]}</strong>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="float-right text-right">
                                            <strong>{user.impressions}</strong><br/><span
                                            className="text-muted">impressions</span><br/>
                                            <strong>{user.conversions}</strong><br/><span
                                            className="text-muted">conversions</span><br/>
                                            <strong>${user.revenue}</strong><br/><span
                                            className="text-muted">revenue</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    })}
                </div>
            </Spin>
            {this.state.total > 0 &&
            <Pagination className="float-right m-2"
                        defaultCurrent={1}
                        pageSize={pageSize}
                        total={this.state.total}
                        showSizeChanger={false}
                        onChange={page => this.setState({page}, this.fetch)}
            />}
        </React.Fragment>
    }
}

export default Stats;

if (document.getElementById('root')) {
    ReactDOM.render(<Stats/>, document.getElementById('root'));
}
