import { Model } from 'radiks'
import _ from 'lodash'

export default class Property extends Model {
    static className = 'Property';
  
    static schema = {
      title: {
        type: String,
        decrypted: true
      },
      description: {
        type: String,
        decrypted: true
      },
      propertyType: {
        type: String,
        decrypted: true
      },
      host: {
        type: String,
        decrypted: true
      },
      hostEmail: {
        type: String,
        decrypted: true
      },
      lat: {
        type: Number,
        decrypted: true
      },
      lng: {
        type: Number,
        decrypted: true
      },
      location: {
        type: Object,
        decrypted: true
      },
      streetAddress: {
        type: String,
        decrypted: true
      },
      city: {
        type: String,
        decrypted: true
      },
      numberOfGuests: {
        type: Number,
        decrypted: true
      },
      amenities: {
        type: [String],
        decrypted: true
      },
      checkIn: String,
      checkOut: String,
      maxRange: {
        type: Number,
        decrypted: true
      },
      minRange: {
        type: Number,
        decrypted: true
      },
      bookedDates: {
        type: [Object],
        decrypted: true
      },
      imageFiles: {
        type: [String],
        decrypted: true
      },
      imageName: {
        type: String,
        decrypted: true
      },
      pendingProposals: {
        type: [Object],
        decrypted: true
      },
      beds: {
        type: Number,
        decrypted: true
      }
    }

    static defaults = {
      amenities: "",
      checkIn: "2:00 PM",
      checkOut: "10:00 AM",
      bookedDates: [{ // startDate, endDate, user, price
        startDate: "6/3/2019",
        endDate: "6/10/2019",
        user: 'iperez319.id.blockstack',
        price: 80
      },
      {
        startDate: "6/15/2019",
        endDate: "6/20/2019",
        user: 'iperez319.id.blockstack',
        price: 80
      }
    ]
    }
    isAvailable = (startDate, endDate) => {
      //TODO Change this function
      return true

      if(this.attrs.bookedDates !== ""){
        const bookedDates = this.attrs.bookedDates.split(',')
        const dates = _.map(bookedDates, (i) => {
          const vdates = i.split('-')
          const startDate = new Date(vdates[0])
          const endDate = new Date(vdates[1])
          return {startDate, endDate}
        })
        for(var date in dates){
           if(Math.max(date.startDate, startDate) < Math.min(date.endDate, endDate)){
             continue;
           }
           else{
             return false;
           }
        }
        return true;
      }
      else{
        return true;
      }
      
    }
  }
  