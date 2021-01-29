<script>
import { inject } from "vue";

export default {
  name: 'Example',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  computed: {
    computedMessage() {
      return `Note: ${this.message}`;
    },
  },
  setup() {
    console.log(inject('Key', 'Default from library'))
  },
  render() {
    return this.$slots.header
      ? this.$slots.header({ message: this.computedMessage })
      : this.message;
  },
};
</script>
