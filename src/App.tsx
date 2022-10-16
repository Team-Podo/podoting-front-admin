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
import PerformanceContentPage from "./pages/performanceContentPage/PerformanceContentPage";
import AlarmContainer from "./containers/AlarmContainer";
import AreaPage from "./pages/areaPage/AreaPage";
import PeoplePage from "./pages/peoplePage/PeoplePage";
import PageNotFound from "./pages/pageNotFound/PageNotFound";

function App() {
  return (
      <BrowserRouter>
          <div id={"modal-root"}></div>
          <AlarmContainer/>
          <Nav/>
          <Routes>
              <Route path={PATH.MAIN} element={<MainPage/>}/>
              <Route path={PATH.PERFORMANCES} element={<PerformanceListPage/>}/>
              <Route path={PATH.PLACES} element={<PlaceListPage/>}/>
              <Route path={PATH.PEOPLE} element={<PeoplePage/>}/>
              <Route path={`${PATH.PLACE_AREAS}:id`} element={<PlaceDetailPage/>}/>
              <Route path={`${PATH.PLACE_AREAS}:placeId/create`} element={<AreaPage type={"new"}/>}/>
              <Route path={`${PATH.PLACE_AREAS}:placeId/:areaId`} element={<AreaPage type={"edit"}/>}/>
              <Route path={`${PATH.PERFORMANCE_CREATE}`} element={<PerformanceDetailPage type={"create"}/>}/>
              <Route path={`${PATH.PERFORMANCE_EDIT}:id`} element={<PerformanceDetailPage type={"edit"}/>}/>
              <Route path={`${PATH.PERFORMANCE_CAST}:performanceID`} element={<CastPage/>}/>
              <Route path={`${PATH.PERFORMANCE}:performanceID/area/`} element={<PerformanceSeatPage/>}/>
              <Route path={`${PATH.PERFORMANCE_SCHEDULE}:performanceID`} element={<SchedulePage/>}/>
              <Route path={`${PATH.PERFORMANCE_CONTENT}:performanceID`} element={<PerformanceContentPage/>}/>
              <Route path={"*"} element={<PageNotFound/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
