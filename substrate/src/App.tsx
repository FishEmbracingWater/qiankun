import { useEffect } from "react";
import { Route, Routes, Link, BrowserRouter } from "react-router";
import { initQK } from "./initQK";

function App() {
  useEffect(() => {
    initQK();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Link to="/about">去 About</Link> |<Link to="/react">去 React</Link> |
        <Link to="/vue">去 Vue</Link>
        <Routes>
          <Route path="/about" element={<div>关于页</div>} />
        </Routes>
      </BrowserRouter>
      {/* 让容器全局存在，避免 qiankun 在路由切换瞬间找不到容器 */}
      <div style={{ padding: "20px" }} id="container"></div>
    </>
  );
}

export default App;
