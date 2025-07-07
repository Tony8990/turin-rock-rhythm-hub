
class Event {
  constructor(data) {
    this.name = data.name;
    this.description = data.description;
    this.date = new Date(data.date);
    this.venue = data.venue;
    this.ticketPrice = data.ticketPrice || data.ticket_price;
    this.imageUrl = data.imageUrl || data.image_url;
    this.maxAttendees = data.maxAttendees || data.max_attendees;
    this.category = data.category || 'rockabilly'; // rockabilly, swing, lindy-hop, charleston
    this.organizer = data.organizer;
    this.contactInfo = data.contactInfo || data.contact_info;
    this.isActive = data.isActive !== undefined ? data.isActive : (data.is_active !== undefined ? data.is_active : true);
    this.isFeatured = data.isFeatured !== undefined ? data.isFeatured : (data.is_featured !== undefined ? data.is_featured : false);
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
    
    if ((data.ticketPrice || data.ticket_price) && 
        (isNaN(data.ticketPrice || data.ticket_price) || (data.ticketPrice || data.ticket_price) < 0)) {
      errors.push('Il prezzo del biglietto deve essere un numero positivo');
    }
    
    if ((data.maxAttendees || data.max_attendees) && 
        (isNaN(data.maxAttendees || data.max_attendees) || (data.maxAttendees || data.max_attendees) < 1)) {
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
      ticket_price: this.ticketPrice,
      image_url: this.imageUrl,
      max_attendees: this.maxAttendees,
      category: this.category,
      organizer: this.organizer,
      contact_info: this.contactInfo,
      is_active: this.isActive,
      is_featured: this.isFeatured
    };
  }
}

module.exports = Event;
