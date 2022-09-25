import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import Nav from "./components/Nav/Nav";
import {PATH} from "./constants/path";
import PerformanceListPage from "./pages/performanceListPage/PerformanceListPage";
import PerformanceDetailPage from "./pages/performanceDetailPage/PerformanceDetailPage";
import CastPage from "./pages/castPage/CastPage";
import PerformanceSeatPage from "./pages/performanceSeatPage/PerformanceSeatPage";
import SchedulePage from "./pages/SchedulePage/SchedulePage";
import PlaceListPage from "./pages/placeListPage/PlaceListPage";
import PlaceDetailPage from "./pages/placeDetailPage/PlaceDetailPage";
import CounterContainer from "./containers/CounterContainer";
import PerformanceContentPage from "./pages/performanceContentPage/PerformanceContentPage";

function App() {
  return (
      <BrowserRouter>
          <Nav/>
          <Routes>
              <Route path={PATH.MAIN} element={<MainPage/>}/>
              <Route path={PATH.PERFORMANCES} element={<PerformanceListPage/>}/>
              <Route path={PATH.PLACES} element={<PlaceListPage/>}/>
              <Route path={`${PATH.PLACE}:id`} element={<PlaceDetailPage type={"edit"}/>}/>
              <Route path={`${PATH.PLACE_CREATE}`} element={<PlaceDetailPage type={"create"}/>}/>
              <Route path={`${PATH.PERFORMANCE_CREATE}`} element={<PerformanceDetailPage type={"create"}/>}/>
              <Route path={`${PATH.PERFORMANCE_EDIT}:id`} element={<PerformanceDetailPage type={"edit"}/>}/>
              <Route path={`${PATH.PERFORMANCE_CAST}:id`} element={<CastPage/>}/>
              <Route path={`${PATH.PERFORMANCE_SEAT}:id`} element={<PerformanceSeatPage/>}/>
              <Route path={`${PATH.PERFORMANCE_SCHEDULE}:id`} element={<SchedulePage/>}/>
              <Route path={`${PATH.PERFORMANCE_CONTENT}:id`} element={<PerformanceContentPage/>}/>
              <Route path={"/counter"} element={<CounterContainer/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
