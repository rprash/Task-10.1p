import React, { useState } from 'react';
import { Button, Form, Radio, Checkbox } from 'semantic-ui-react'
import Header from './components/Header';
import './App.css';
import Heading from './components/Heading';
import axois from 'axios';

const App = () => {
  const [taskType, setTaskType] = useState('Choice Task');
  const [masterWorker, setMasterWorker] = useState(true);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  const [reward, setReward] = useState('');
  const [workers, setWorkers] = useState('');
  const [trueOrFalse, setTrueOrFalse] = useState(null);
  const [sentence, setSentence] = useState('');

  return (
    <div className="App">
      <Header />
      <div className="task_cont">
        Select Task Type:
            <Form className="task_form">
          <Form.Field>
            <Radio
              label='Choice Task'
              name='radioGroup'
              value='Choice Task'
              checked={taskType === 'Choice Task'}
              onChange={(e, { value }) => { setTaskType(value) }}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Decision-Making Task'
              name='radioGroup'
              value='Decision-Making Task'
              checked={taskType === 'Decision-Making Task'}
              onChange={(e, { value }) => { setTaskType(value) }}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Sentence-Level Task'
              name='radioGroup'
              value='Sentence-Level Task'
              checked={taskType === 'Sentence-Level Task'}
              onChange={(e, { value }) => { setTaskType(value) }}
            />
          </Form.Field>
        </Form>
      </div>
      <Heading heading='Describe your task to Workers' />
      <Form.Input value={title} onChange={(e) => { setTitle(e.target.value) }} className='title_input field_row' label='Title' placeholder='Enter task title' />
      <Form.Input value={desc} onChange={(e) => { setDesc(e.target.value) }} className='field_row' label='Description' placeholder='Enter task description' />
      <Form.Input value={date} onChange={(e) => { setDate(e.target.value) }} className='field_row' label='Expiry Date' />
      <Heading heading='Setting up your task' />
      <div className='settings_section'>{taskType == 'Decision-Making Task' ?
        <div className="task_cont">
          Provide true/false answer:
                <Form className="task_form">
            <Form.Field>
              <Radio
                label='True'
                name='radioGroup'
                value='True'
                checked={trueOrFalse === 'True'}
                onChange={(e, { value }) => { setTrueOrFalse(value) }}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label='False'
                name='radioGroup'
                value='False'
                checked={trueOrFalse === 'False'}
                onChange={(e, { value }) => { setTrueOrFalse(value) }}
              />
            </Form.Field>
          </Form>
        </div>
        :
        taskType == 'Choice Task' ?
          <div className="task_cont">
            Select one or more options:
              <Form className="task_form">
              <Form.Field>
                <Checkbox label='Option 1' />
              </Form.Field>
              <Form.Field>
                <Checkbox label='Option 2' />
              </Form.Field>
              <Form.Field>
                <Checkbox label='Option 3' />
              </Form.Field>
            </Form>
          </div>
          : <div className="task_cont flex">
            Provide your answer:
            <Form className="task_form">
              <Form.Field>
                <Form.Input value={sentence} onChange={(e) => { setSentence(e.target.value) }} className='field_row' />
              </Form.Field>
            </Form>
          </div>
      }</div>
      <Heading heading='Worker Requirement' />
      <div className="task_cont">
        Require Master Workers
            <Form className="task_form">
          <Form.Field>
            <Radio
              label='Yes'
              name='radioGroup'
              value={true}
              checked={masterWorker === true}
              onChange={(e, { value }) => { setMasterWorker(value) }}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='No'
              name='radioGroup'
              value={false}
              checked={masterWorker === false}
              onChange={(e, { value }) => { setMasterWorker(value) }}
            />
          </Form.Field>
        </Form>
      </div>
      <Form.Input value={reward} onChange={(e) => { setReward(e.target.value) }} className='field_row' label='Reward per response' />
      <Form.Input value={workers} onChange={(e) => { setWorkers(e.target.value) }} className='field_row worker_input' label='Number of workers' />
      <Button
        onClick={async () => {
          try {
            const res = await axois.post('https://icrowdtaskapi.herokuapp.com/records', {
              taskType: taskType,
              title: title,
              Description: desc,
              ExpiryDate: date,
              areMasterWorkers: masterWorker,
              reward: reward,
              workersCount: workers,
            })
          } catch (e) {
            console.log(e)
          }
          setTaskType('Choice Task');
          setMasterWorker(true);
          setTitle('');
          setDesc('');
          setDate('');
          setReward('');
          setWorkers('');
          setSentence('');
          setTrueOrFalse(null);
        }
        }
      >Save</Button>
    </div>
  );
}

export default App;
