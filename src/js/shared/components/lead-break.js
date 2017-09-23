import React from 'react';
import PropTypes from 'prop-types';


const LeadBreak = ({text}) => {
    if (!text) {
        return null;
    }

    const p = text.split('\\n\\n');
    const r = [];

    r.push(<p key="0" className="lead">{p[0]}</p>);
    for (let i = 1; i < p.length; i++) {
        r.push(<p key={i}>{p[i]}</p>);
    }

    return <div>{r}</div>;
};

LeadBreak.propTypes = {
    text: PropTypes.string
};

export default LeadBreak;
