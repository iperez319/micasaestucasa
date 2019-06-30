import { Model } from 'radiks'

export default class Proposal extends Model {
    static className = 'Proposal';
  
    static schema = {
      user: {
        type: String,
        decrypted: true
      },
      price: {
        type: Number,
        decrypted: true
      },
      homeType: {
        type: String,
        decrypted: true
      },
      startDate: {
        type: String,
        decrypted: true
      },
      endDate: {
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
      locationText: {
        type: String,
        decrypted: true
      },
      city: {
        type: String,
        decrypted: true
      },
      numberGuests: {
        type: Number,
        decrypted: true
      },
      open: {
        type: Boolean,
        decrypted: true
      },
      matchedProperties : {
        type: [Object],
        decrypted: true
      },
      status: {
        type: String,
        decrypted: true
      },
      paymentInfo: {
        type: String,
        decrypted: true
      },
      paymentSatoshis: {
        type: Number,
        decrypted: true
      },
      paymentFiat: {
        type: Number,
        decrypted: true
      },
      messages: {
        type: [Object],
        decrypted: true
      }
    }
    static defaults = {
        open: true,
        matchedProperties: [],
        status: "initial",
        paymentInfo: "",
        paymentSatoshis: 0,
        paymentFiat: parseFloat("1.78"),
        messages: []
    }
  }
  