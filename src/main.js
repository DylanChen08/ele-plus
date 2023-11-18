import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
const app = createApp(App);

app.use(ElementPlus, {
    // locale: locale,
    // // 支持 large、default、small
    // size: Cookies.get("size") || "default",
});

app.mount('#app')
