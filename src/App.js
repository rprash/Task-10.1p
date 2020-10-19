import React, { useState } from 'react';
import { Button, Form, Radio } from 'semantic-ui-react'
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
      <div className='settings_section'>{taskType == 'Choice Task' ? 'Choice Task (Select one or several answers)'
        :
        taskType == 'Decision-Making Task' ? 'Decision-Making Task (Provide True/False answers)'
          : 'Sentence-Level Task (Provide sentences as answers)'
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
        }
        }
      >Save</Button>
    </div>
  );
}

export default App;
