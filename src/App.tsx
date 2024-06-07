import {Routes,Route} from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Provider } from "react-redux";
import store from "./redux/store";
import Users from "./routes/users/Users";
import Admin from "./routes/admin/Admin";


export default function App() {
  return <>
  <Provider store={store}>
  <Routes>
          <Route  path="/*" element={<Users/>} />
          <Route  path="/admin/*" element={<Admin/>} />
        </Routes>
  <Toaster/>
  </Provider>
  </>;
}
