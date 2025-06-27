import { RouterProvider } from "react-router";
import router from "./routes/router.jsx";
import { ConfigProvider, App as AntdApp } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector.jsx"

function App() {
  return (
    <AntdApp>
      <StyleProvider layer>
        <ConfigProvider theme={{ hashed: false }}>
          <LanguageSelector />
          <RouterProvider router={router}/>
        </ConfigProvider>
      </StyleProvider>
    </AntdApp>
  );
}

export default App;
