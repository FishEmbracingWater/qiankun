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
        <nav>
          <Link to="/about">去 About</Link> |<Link to="/react">去 React</Link> |
          <Link to="/vue">去 Vue</Link>
        </nav>

        {/* 让容器全局存在，避免 qiankun 在路由切换瞬间找不到容器 */}
        <div id="container"></div>

        <Routes>
          <Route path="/about" element={<div>关于页</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
