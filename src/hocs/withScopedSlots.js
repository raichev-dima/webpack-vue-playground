import { h, provide } from "vue";

// const Key = Symbol("Key");

const withScopedSlots = (component) => {
  return {
    name: `WithScopedSlots${component.name}`,
    props: component.props,
    setup(props, context) {
      provide("Key", "Context from library provided!");

      return () => h(component, props, context.slots);
    },
  };
};

export default withScopedSlots;
