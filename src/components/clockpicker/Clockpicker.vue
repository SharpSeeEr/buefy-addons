<template>
  <div class="b-clockpicker" :class="type">
    <b-dropdown
      v-if="!isMobile || inline"
      ref="dropdown"
      :position="position"
      :disabled="disabled"
      :inline="inline">
      <b-input
        v-if="!inline"
        ref="input"
        slot="trigger"
        autocomplete="off"
        :value="formatValue(dateSelected)"
        :placeholder="placeholder"
        :size="size"
        :icon="icon"
        :icon-pack="iconPack"
        :loading="loading"
        :disabled="disabled"
        :readonly="readonly"
        :rounded="rounded"
        v-bind="$attrs"
        @change.native="onChange($event.target.value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event) && checkHtml5Validity()"/>

      <div
        class="card"
        style="height: auto;"
        :disabled="disabled"
        custom>
        <header v-if="inline" class="card-header">
          <div class="b-clockpicker-header card-header-title">
            <div class="b-clockpicker-time">
              <span
                class="b-clockpicker-btn"
                :class="{ active: isSelectingHour }"
                @click="isSelectingHour = true">{{ hoursDisplay }}</span>
              <span>:</span>
              <span
                class="b-clockpicker-btn"
                :class="{ active: !isSelectingHour }"
                @click="isSelectingHour = false">{{ minutesDisplay }}</span>
            </div>
            <div v-if="!isHourFormat24" class="b-clockpicker-period">
              <div
                class="b-clockpicker-btn"
                :class="{ active: meridienSelected == AM }"
                @click="onMeridienClick(AM)">am</div>
              <div
                class="b-clockpicker-btn"
                :class="{ active: meridienSelected == PM }"
                @click="onMeridienClick(PM)">pm</div>
            </div>
          </div>
        </header>
        <div class="card-content">
          <div
            class="b-clockpicker-body"
            :style="{ width: faceSize + 'px', height: faceSize + 'px' }">
            <div v-if="!inline" class="b-clockpicker-time">
              <div
                class="b-clockpicker-btn"
                :class="{ active: isSelectingHour }"
                @click="isSelectingHour = true">Hours</div>
              <span
                class="b-clockpicker-btn"
                :class="{ active: !isSelectingHour }"
                @click="isSelectingHour = false">Min</span>
            </div>
            <div v-if="!isHourFormat24 && !inline" class="b-clockpicker-period">
              <div
                class="b-clockpicker-btn"
                :class="{ active: meridienSelected == AM }"
                @click="onMeridienClick(AM)">{{ AM }}</div>
              <div
                class="b-clockpicker-btn"
                :class="{ active: meridienSelected == PM }"
                @click="onMeridienClick(PM)">{{ PM }}</div>
            </div>
            <b-clockpicker-face
              :picker-size="faceSize"
              :min="minFaceValue"
              :max="maxFaceValue"
              :face-numbers="isSelectingHour ? hours : minutes"
              :disabled-values="faceDisabledValues()"
              :double="isSelectingHour && isHourFormat24"
              :value="isSelectingHour ? hoursSelected : minutesSelected"
              @input="onClockInput"
              @change="onClockChange" />
          </div>
        </div>
        <footer
          v-if="$slots.default !== undefined && $slots.default.length"
          class="b-clockpicker-footer card-footer">
          <slot/>
        </footer>
      </div>
    </b-dropdown>
  </div>

</template>

<script>
import FormElementMixin from '~buefy/src/utils/FormElementMixin'
import BClockpickerFace from './ClockpickerFace'
import { Dropdown as BDropdown } from '~buefy/src/components/dropdown'
import BInput from '~buefy/src/components/input'

const outerPadding = 12

const AM = 'AM'
const PM = 'PM'
const HOUR_FORMAT_24 = '24'
const HOUR_FORMAT_12 = '12'

export default {
  name: 'BClockpicker',
  inheritAttrs: false,
  components: {
    BClockpickerFace,
    BInput,
    BDropdown
  },
  mixins: [FormElementMixin],
  props: {
    value: Date,
    inline: Boolean,
    minTime: Date,
    maxTime: Date,
    placeholder: String,
    readonly: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    pickerSize: {
      type: Number,
      default: 290
    },
    hourFormat: {
      type: String,
      default: HOUR_FORMAT_12,
      validator: (value) => {
        return value === '24' || value === '12'
      }
    },
    incrementMinutes: {
      type: Number,
      default: 5
    },
    timeFormatter: {
      type: Function,
      default: (date) => {
        return this.defaultTimeFormatter(date)
      }
    },
    timeParser: {
      type: Function,
      default: (date) => {
        return this.defaultTimeParser(date)
      }
    },
    autoSwitch: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'is-primary'
    },
    mobileNative: {
      type: Boolean,
      default: true
    },
    position: String,
    unselectableTimes: Array
  },
  data() {
    return {
      isSelectingHour: true,
      isDragging: false,
      AM,
      PM,
      HOUR_FORMAT_24,
      HOUR_FORMAT_12
    }
  },
  computed: {
    hours() {
      const hours = []
      const numberOfHours = this.isHourFormat24 ? 24 : 12
      for (let i = 0; i < numberOfHours; i++) {
        let value = i
        let label = value
        if (!this.isHourFormat24) {
          value = (i + 1)
          label = value
          if (this.meridienSelected === this.AM) {
            if (value === 12) {
              value = 0
            }
          } else if (this.meridienSelected === this.PM) {
            if (value !== 12) {
              value += 12
            }
          }
        }
        hours.push({
          label: this.formatNumber(label),
          value: value
        })
      }
      return hours
    },
    minutes() {
      const minutes = []
      for (let i = 0; i < 60; i += this.incrementMinutes) {
        minutes.push({
          label: this.formatNumber(i),
          value: i
        })
      }
      return minutes
    },
    hoursDisplay() {
      if (this.hoursSelected == null) return '--'
      if (this.isHourFormat24) return this.pad(this.hoursSelected)

      let display = this.hoursSelected
      if (this.meridienSelected === this.PM) display -= 12
      if (display === 0) display = 12
      return display
    },
    minutesDisplay() {
      return this.minutesSelected == null ? '--' : this.pad(this.minutesSelected)
    },
    minFaceValue() {
      return this.isSelectingHour &&
        !this.isHourFormat24 &&
        this.meridienSelected === this.PM ? 12 : 0
    },
    maxFaceValue() {
      return this.isSelectingHour
        ? (!this.isHourFormat24 && this.meridienSelected === this.AM ? 11 : 23)
        : 59
    },
    faceFormatter() {
      return this.isSelectingHour && !this.isHourFormat24
        ? (val) => val
        : this.formatNumber
    },
    faceSize() {
      return this.pickerSize - (outerPadding * 2)
    },
    isHourFormat24() {
      return this.hourFormat === HOUR_FORMAT_24
    }
  },
  methods: {
    onMeridienChange(value) {
      if (this.hoursSelected !== null) {
        if (value === PM) {
          this.hoursSelected += 12
        } else if (value === AM) {
          this.hoursSelected -= 12
        }
      }
      this.updateDateSelected(this.hoursSelected, this.minutesSelected, value)
    },
    onHoursChange(value) {
      this.updateDateSelected(
        parseInt(value, 10),
        this.minutesSelected,
        this.meridienSelected
      )
    },
    onMinutesChange(value) {
      this.updateDateSelected(
        this.hoursSelected,
        parseInt(value, 10),
        this.meridienSelected
      )
    },
    updateDateSelected(hours, minutes, meridiens) {
      if (hours != null && minutes != null &&
        ((!this.isHourFormat24 && meridiens !== null) || this.isHourFormat24)) {
        if (this.dateSelected && !isNaN(this.dateSelected)) {
          this.dateSelected = new Date(this.dateSelected)
        } else {
          this.dateSelected = new Date()
          this.dateSelected.setMilliseconds(0)
          this.dateSelected.setSeconds(0)
        }
        this.dateSelected.setHours(hours)
        this.dateSelected.setMinutes(minutes)
      }
    },

    updateInternalState(value) {
      if (value) {
        this.hoursSelected = value.getHours()
        this.minutesSelected = value.getMinutes()
        this.meridienSelected = value.getHours() >= 12 ? PM : AM
      } else {
        this.hoursSelected = null
        this.minutesSelected = null
        this.meridienSelected = AM
      }
    },

    isHourDisabled(hour) {
      let disabled = false
      if (this.minTime) {
        const minHours = this.minTime.getHours()
        disabled = hour < minHours
      }
      if (this.maxTime) {
        if (!disabled) {
          const maxHours = this.maxTime.getHours()
          disabled = hour > maxHours
        }
      }
      if (this.unselectableTimes) {
        if (!disabled) {
          if (this.minutesSelected !== null) {
            const unselectable = this.unselectableTimes.filter((time) => {
              return time.getHours() === hour &&
                time.getMinutes() === this.minutesSelected
            })
            disabled = unselectable.length > 0
          } else {
            const unselectable = this.unselectableTimes.filter((time) => {
              return time.getHours() === hour
            })
            disabled = unselectable.length === this.minutes.length
          }
        }
      }
      return disabled
    },

    isMinuteDisabled(minute) {
      let disabled = false
      if (this.hoursSelected !== null) {
        if (this.isHourDisabled(this.hoursSelected)) {
          disabled = true
        } else {
          if (this.minTime) {
            const minHours = this.minTime.getHours()
            const minMinutes = this.minTime.getMinutes()
            disabled = this.hoursSelected === minHours && minute < minMinutes
          }
          if (this.maxTime) {
            if (!disabled) {
              const maxHours = this.maxTime.getHours()
              const minMinutes = this.maxTime.getMinutes()
              disabled = this.hoursSelected === maxHours && minute > minMinutes
            }
          }
        }
        if (this.unselectableTimes) {
          if (!disabled) {
            const unselectable = this.unselectableTimes.filter((time) => {
              return time.getHours() === this.hoursSelected &&
                time.getMinutes() === minute
            })
            disabled = unselectable.length > 0
          }
        }
      }
      return disabled
    },

    /*
    * Parse string into date
    */
    onChange(value) {
      const date = this.parseTime(value)
      this.updateInternalState(date)
      if (date && !isNaN(date)) {
        this.dateSelected = date
      } else {
        // Force refresh input value when not valid date
        this.dateSelected = null
        this.$refs.input.newValue = this.dateSelected
      }
    },
    onClockInput(value) {
      if (this.isSelectingHour) {
        this.hoursSelected = value
        this.onHoursChange(value)
      } else {
        this.minutesSelected = value
        this.onMinutesChange(value)
      }
    },
    onClockChange(value) {
      if (this.autoSwitch && this.isSelectingHour) {
        this.isSelectingHour = !this.isSelectingHour
      }
    },
    onMeridienClick(value) {
      if (this.meridienSelected !== value) {
        this.meridienSelected = value
        this.onMeridienChange(value)
      }
    },
    faceDisabledValues() {
      return this.isSelectingHour ? this.isHourDisabled : this.isMinuteDisabled
    },

    /*
    * Close dropdown time picker
    */
    close() {
      if (this.$refs.dropdown) {
        this.$refs.dropdown.isActive = false
      }
    },
    pad(value) {
      return (value < 10 ? '0' : '') + value
    },

    /*
    * Format date into string
    */
    formatValue(date) {
      if (date && !isNaN(date)) {
        return this.formatTime(date)
      } else {
        return null
      }
    },
    formatTime(date) {
      if (typeof this.timeFormatter === 'function') {
        return this.timeFormatter(date)
      } else {
        return this.defaultTimeFormatter(date)
      }
    },
    parseTime(date) {
      if (typeof this.timeParser === 'function') {
        return this.timeParser(date)
      } else {
        return this.defaultTimeParser(date)
      }
    },
    defaultTimeFormatter(date) {
      let hours = date.getHours()
      const minutes = date.getMinutes()
      let period = ''
      if (this.hourFormat === HOUR_FORMAT_12) {
        period = ' ' + (hours < 12 ? AM : PM)
        if (hours > 12) {
          hours -= 12
        } else if (hours === 0) {
          hours = 12
        }
      }
      return this.formatNumber(hours) + ':' + this.pad(minutes) + period
    },
    defaultTimeParser(timeString) {
      if (timeString) {
        let am = false
        if (this.hourFormat === HOUR_FORMAT_12) {
          const dateString12 = timeString.split(' ')
          timeString = dateString12[0]
          am = dateString12[1] === AM
        }
        const time = timeString.split(':')
        let hours = parseInt(time[0], 10)
        const minutes = parseInt(time[1], 10)
        if (isNaN(hours) || hours < 0 || hours > 23 ||
          (this.hourFormat === HOUR_FORMAT_12 && (hours < 1 || hours > 12)) ||
          isNaN(minutes) || minutes < 0 || minutes > 59) {
          return null
        }
        let d = null
        if (this.dateSelected && !isNaN(this.dateSelected)) {
          d = new Date(this.dateSelected)
        } else {
          d = new Date()
          d.setMilliseconds(0)
          d.setSeconds(0)
        }
        d.setMinutes(minutes)
        if (this.hourFormat === HOUR_FORMAT_12) {
          if (am && hours === 12) {
            hours = 0
          } else if (!am && hours !== 12) {
            hours += 12
          }
        }
        d.setHours(hours)
        return d
      }
      return null
    }
  },
  created() {
    this.incrementMinutes = 5
  },
  mounted() {
    this.updateInternalState(this.value)
  }
}
</script>

<style lang="scss">
@import 'clockpicker';
</style>
