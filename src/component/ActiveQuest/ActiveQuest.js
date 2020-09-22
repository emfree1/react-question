import React from 'react'
import './ActiveQuest.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuest = props =>(
    <div className='ActiveQuest'>
        <p className='Question'>
            <span>
                <strong>{props.answerNumber}.</strong>&nbsp; 
                {props.question}
            </span>
            <small>{props.answerNumber} з {props.questionLength}</small>
        </p>
        <AnswersList answers={props.answers} onAnswerClick={props.onAnswerClick} state={props.state} />
    </div>
)

export default ActiveQuest