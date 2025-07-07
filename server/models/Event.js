
class Event {
  constructor(data) {
    this.name = data.name;
    this.description = data.description;
    this.date = new Date(data.date);
    this.venue = data.venue;
    this.ticketPrice = data.ticketPrice;
    this.imageUrl = data.imageUrl;
    this.maxAttendees = data.maxAttendees;
    this.category = data.category || 'rockabilly'; // rockabilly, swing, lindy-hop, charleston
    this.organizer = data.organizer;
    this.contactInfo = data.contactInfo;
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.isFeatured = data.isFeatured !== undefined ? data.isFeatured : false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static validate(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 3) {
      errors.push('Il nome dell\'evento deve essere di almeno 3 caratteri');
    }
    
    if (!data.description || data.description.trim().length < 10) {
      errors.push('La descrizione deve essere di almeno 10 caratteri');
    }
    
    if (!data.date) {
      errors.push('La data dell\'evento è richiesta');
    } else if (new Date(data.date) < new Date()) {
      errors.push('La data dell\'evento non può essere nel passato');
    }
    
    if (!data.venue || data.venue.trim().length < 3) {
      errors.push('La location dell\'evento è richiesta');
    }
    
    if (data.ticketPrice && (isNaN(data.ticketPrice) || data.ticketPrice < 0)) {
      errors.push('Il prezzo del biglietto deve essere un numero positivo');
    }
    
    if (data.maxAttendees && (isNaN(data.maxAttendees) || data.maxAttendees < 1)) {
      errors.push('Il numero massimo di partecipanti deve essere almeno 1');
    }
    
    return errors;
  }

  toJSON() {
    return {
      name: this.name,
      description: this.description,
      date: this.date,
      venue: this.venue,
      ticketPrice: this.ticketPrice,
      imageUrl: this.imageUrl,
      maxAttendees: this.maxAttendees,
      category: this.category,
      organizer: this.organizer,
      contactInfo: this.contactInfo,
      isActive: this.isActive,
      isFeatured: this.isFeatured,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Event;
