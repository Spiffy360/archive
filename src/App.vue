<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-">
        <span>Spiffy360 </span>
        <span class="font-weight-light">Archive</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text href="http://wii.hacks.guide/themes" target="More"></v-btn>
      <v-btn
        text
        href="http://archive.org/download/spiffy360_wii_downloads/"
        target="_blank"
      >Downloads Archive</v-btn>
    </v-app-bar>
    <v-content class="spiffybg">
      <v-tabs grow>
        <v-tab key="wii">Wii</v-tab>

        <v-tab-item key="wii" class="spiffybg">
          <v-select
            solo
            :items="wii_items"
            label="Software"
            v-model="wii_value"
            class="mt-6 mx-12"
          />
          <v-text-field
            solo
            label="Search"
            v-model="wii_search"
            class="mx-12"
          ></v-text-field>
          <p v-if="themes.length === 0">Loading...</p>
          <div v-for="(theme, i) in themes" v-bind:key="i">
            <v-card shaped class="mb-8 mx-4" v-if="theme.software === wii_value && theme.name.toLowerCase().includes(wii_search.toLowerCase())">
              <div>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="auto" style="min-width: 50%;" align-self="center">
                      <v-img aspect-ratio='1.7' contain :src="`/img/${theme.id}.jpg`"/>
                    </v-col>
                    <v-col cols="12" md="auto">
                      <span class="headline">{{ theme.name }}</span>
                      <br>
                      <span style="font-weight-thin">uploaded by {{ theme.createdBy }} on {{ new Date(Date.parse(theme.updated || theme.added)).toDateString() }}</span>
                      <br><br>
                      <div v-if="theme.supportedVersion">
                        <span>Supported Software: {{ theme.software }} {{ theme.supportedVersion}}</span>
                        <br><br>
                      </div>
                      <div v-if="theme.votes">
                        <span>Rating: {{ theme.rating }} / 10</span>
                        <br>
                        <span>Votes: {{ theme.votes }}</span>
                      </div>
                      <span v-else>No votes</span>
                      <br><br>
                      <v-btn :href="`${theme.url}`">Download</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
            </v-card>
          </div>
        </v-tab-item>
      </v-tabs>
    </v-content>
  </v-app>
</template>

<script>
import themes from '@/assets/meta.json'
import firstBy from 'thenby'

export default {
  name: 'App',
  data: () => ({
    firstBy,
    themes: [],
    wii_items: [
      'USB Loader GX',
      'WiiFlow',
      'MyMenuify',
      'Gecko OS',
      'Configurable USB Loader',
      'Homebrew Channel',
      'Wodeflow',
      'Save Game GX',
      'WiiMC'
    ],
    wii_value: 'USB Loader GX',
    wii_search: ''
  }),
  mounted () {
    this.$nextTick(() => {
      this.themes = [...themes].reverse().sort(firstBy(theme => theme.votes * theme.rating, -1).thenBy('name'))
    })
  }
}
</script>

<style scoped>
  .tab-item {
    background: #303030;
  }
  .spiffybg {
    background: url('/background.jpg');
  }
</style>
