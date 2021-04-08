import React from 'react';

function Overview(props) {

    return (
    <div>
    <h1>The Tasks For the Day</h1>
    <ul>
        {props.list}
    </ul>
    </div>
    );
}

export default Overview;