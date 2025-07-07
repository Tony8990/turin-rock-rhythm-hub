
class Course {
  constructor(data) {
    this.name = data.name;
    this.description = data.description;
    this.instructor = data.instructor;
    this.time = data.time;
    this.location = data.location;
    this.maxParticipants = data.maxParticipants || 20;
    this.price = data.price;
    this.imageUrl = data.imageUrl;
    this.level = data.level || 'beginner'; // beginner, intermediate, advanced
    this.duration = data.duration; // in weeks
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static validate(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 3) {
      errors.push('Il nome del corso deve essere di almeno 3 caratteri');
    }
    
    if (!data.description || data.description.trim().length < 10) {
      errors.push('La descrizione deve essere di almeno 10 caratteri');
    }
    
    if (!data.instructor || data.instructor.trim().length < 2) {
      errors.push('Il nome dell\'istruttore è richiesto');
    }
    
    if (!data.time || data.time.trim().length < 3) {
      errors.push('L\'orario del corso è richiesto');
    }
    
    if (!data.location || data.location.trim().length < 3) {
      errors.push('La location del corso è richiesta');
    }
    
    if (data.price && (isNaN(data.price) || data.price < 0)) {
      errors.push('Il prezzo deve essere un numero positivo');
    }
    
    if (data.maxParticipants && (isNaN(data.maxParticipants) || data.maxParticipants < 1)) {
      errors.push('Il numero massimo di partecipanti deve essere almeno 1');
    }
    
    return errors;
  }

  toJSON() {
    return {
      name: this.name,
      description: this.description,
      instructor: this.instructor,
      time: this.time,
      location: this.location,
      maxParticipants: this.maxParticipants,
      price: this.price,
      imageUrl: this.imageUrl,
      level: this.level,
      duration: this.duration,
      startDate: this.startDate,
      endDate: this.endDate,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Course;
