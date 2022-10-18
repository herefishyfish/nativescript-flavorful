<template>
  <Page>
    <ActionBar>
      <Label text="Home"/>
    </ActionBar>

    <StackLayout>
      <Label class="info">
        <FormattedString>
          <Span class="fas text-primary" text.decode="&#xf135; "/>
          <Span class="text-primary-dark" :text="message"/>
        </FormattedString>
      </Label>
      <Button
        class="btn btn-primary btn-rounded border-8"
        :borderColor="color"
        text="SO MUCH FLAVOR!">
      </Button>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
  import Vue from "nativescript-vue";
  import { getColor, getMinimumCycleCount } from '@flavorful/ui/core';

  export default Vue.extend({
    computed: {
      color() {
        return 'red';
      },
      message() {
        return "Blank {N}-Vue app";
      }
    },
    data () {
      return {
        color: 'red',
        phaseCount: 0,
        cycle: getMinimumCycleCount()
      }
    },
    methods: {
      pollColor () {
        setInterval(() => {
          if(this.phaseCount > this.cycle) {
            this.phaseCount = 0;
          }
          this.color = getColor(this.phaseCount++);
        }, 1000 / 120)
      }
    },
    created () {
      this.pollColor()
    }
  });
</script>

<style scoped lang="scss">
  .info {
    font-size: 20;
    horizontal-align: center;
    vertical-align: center;
  }
</style>
