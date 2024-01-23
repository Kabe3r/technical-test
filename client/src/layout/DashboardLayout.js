import { Routes, Route } from 'react-router-dom';
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import PrivateOutlet from "../util/PrivateOutlet";
import CurrentProject from '../features/current/CurrentProject';
import ArchivedProject from '../features/archived/Archived';
import CompletedProject from '../features/completed/Completed';
import Project from '../features/current/Project';

export default function DashboardLayout() {
  return (
    <Routes>
    <Route exact path='/login' element={<Login />} />
    <Route exact path='/register' element={<Register />} />
    <Route path='/' element={<PrivateOutlet />} >
      <Route path='dashboard/projects/all' element={<CurrentProject />} />
      <Route path='dashboard/projects/:id' element={<Project />} />
      <Route path='dashboard/projects/archived' element={<ArchivedProject />} />
      <Route path='dashboard/projects/completed' element={<CompletedProject />} />
    </Route>
    </Routes>
  )
}
