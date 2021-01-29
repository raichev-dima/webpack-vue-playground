import Example from "./components/Example/Example.vue";
import withScopedSlots from "@/hocs/withScopedSlots";

const ExamplePlugin = {
  install(app) {
    app.component("Example", withScopedSlots(Example));
  },
};

export { Example, withScopedSlots, ExamplePlugin };
