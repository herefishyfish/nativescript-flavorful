<page>
    <actionBar title="Home" />
    <stackLayout>
        <label class="info text-4xl">
            <formattedString>
                <span class="fas" text="&#xf135;" />
                <span class="text-primary-dark font-bold" text=" {message}" />
            </formattedString>
        </label>
        <button
          class="btn btn-primary rounded-full border-8"
          borderColor="{color}"
          text="SO MUCH FLAVOR!"
        ></button>
    </stackLayout>
</page>

<script lang="ts">
    import { getMinimumCycleCount, getColor } from '@flavorful/core';

    let message: string = "Blank Svelte Native App"
    let phaseCount: number = 0;
    let color: string = "";

    const cycle = getMinimumCycleCount();
    setInterval(() => {
      if(phaseCount > cycle) {
        phaseCount = 0;
      }
      color = getColor(phaseCount++);
    }, 1000 / 120);
</script>

<style>
    .info {
        horizontal-align: center;
        vertical-align: center;
    }
</style>
