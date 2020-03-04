import React from 'react';

const Misc = (props) => {
    return (
        <>
        <p>
            Total Card:{' '}
            <strong>
            {props.filter.length === 0
                ? props.cardList.length
                : props.filter.length}{' '}
            items
            </strong>
        </p>

        <div className="d-flex">
            <p className="my-auto mr-2">Per Page :</p>
            <select
            value={props.limit}
            onChange={(e) => props.setLimit(Number(e.target.value))}
            className="custom-select col"
            >
            <option value={12}>12</option>
            <option value={60}>60</option>
            <option value={120}>100</option>
            </select>
        </div>   
        </>
    );
};

export default Misc;