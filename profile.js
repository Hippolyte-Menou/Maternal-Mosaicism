let centromeres = {
    "1": [0.48, 0.59],  // Chromosome 1
    "2": [0.37, 0.4],   // Chromosome 2
    "3": [0.45, 0.48],  // Chromosome 3
    "4": [0.25, 0.28],  // Chromosome 4
    "5": [0.25, 0.28],  // Chromosome 5
    "6": [0.34, 0.37],  // Chromosome 6
    "7": [0.36, 0.4],   // Chromosome 7
    "8": [0.29, 0.33],  // Chromosome 8
    "9": [0.27, 0.49],  // Chromosome 9
    "10": [0.28, 0.32], // Chromosome 10
    "11": [0.38, 0.41], // Chromosome 11
    "12": [0.25, 0.29], // Chromosome 12
    "13": [0.0, 0.17],  // Chromosome 13
    "14": [0.0, 0.19],  // Chromosome 14
    "15": [0.0, 0.2],   // Chromosome 15
    "16": [0.38, 0.52], // Chromosome 16
    "17": [0.27, 0.32], // Chromosome 17
    "18": [0.19, 0.24], // Chromosome 18
    "19": [0.41, 0.48], // Chromosome 19
    "20": [0.41, 0.48], // Chromosome 20
    "21": [0.0, 0.21],  // Chromosome 21
    "22": [0.0, 0.34],  // Chromosome 22
    "X": [0.37, 0.4],   // Chromosome X
    "Y": [0.48, 1.0]    // Chromosome Y
};

let mos_lines
let jitter_amount = 0.01



class Profile {
  constructor(type) {
    this.type = type
    this.chromosome = chromosome
    this.mosaicism_level = mosaicism_level
    
    this.B_fetus = []
    this.Total_fetus = []
    this.B_mother = []
    this.Total_mother = []
    
    this.lines = [];
    this.points = [];
    this.number_of_points = 2000;
    this.generatePoints();
    
  }

  display() {
    // Drawing SNP points
    push()
    stroke(0, 0, 255);
    strokeWeight(3)
    for (let p of this.points) {
      // Exclude points within centromeres and short arms of acrocentric chromosomes
      if (p.x < centromeres[this.chromosome][0]*this.number_of_points || p.x > centromeres[this.chromosome][1]*this.number_of_points){
        let x = map(p.x, 0, this.number_of_points, left_of_graph, width - right_of_graph)
        let y = map(p.y, 0, 1, height - bottom_of_graph, top_of_graph);
        point(x, y);
      }
    }
    pop()
    
    // Drawing ticks and value on the right of graph
    push()
    for (let l of this.lines){
      strokeWeight(3)
      let y = map(l, 0, 1, height - bottom_of_graph, top_of_graph);
      line(width-right_of_graph, y, width-right_of_graph+5, y); // ticks
      textAlign(CENTER, CENTER)
      strokeWeight(1)
      text(l.toFixed(2), width - right_of_graph + 25, y); // Value on the right
    }
    pop()
    
    let top_of_second_graph = height - bottom_of_graph + 200
    // Drawing bottom graph
    push()
    textAlign(CENTER, CENTER)
    let column_width = (width-right_of_graph-left_of_graph) / 10  // TODO fix column width
    for (let mos of [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]){
      mos_lines = this.get_line_values(this.B_fetus, this.Total_fetus, this.B_mother, this.Total_mother, mos)
      let x = map(mos, 0, 1, left_of_graph, width - right_of_graph)
      line(x, top_of_second_graph, x, height - bottom) // Vertical lines left of column
      line(width - right_of_graph + column_width, top_of_second_graph, width - right_of_graph + column_width, height - bottom) // Vertical line extreme right TODO fix col

      push()
      textSize(24)
      textStyle(BOLD)
      text(`${mos*100}%`, x + column_width/2, top_of_second_graph - 40 ) // Percentage at the top
      pop()
      
      /*push()
      noFill()
      stroke(0)
      arc(x + column_width/2, height - bottom, column_width, column_width, 0, -PI) // half-cirle ?
      pop()*/
      
      for (let l in mos_lines){
        let y = map(mos_lines[l], 0, 1, height - bottom, top_of_second_graph)
        line(x, y, x+column_width, y)
        text(mos_lines[l].toFixed(2), x+column_width/2, y-10)
      } 
    }
      
    
    
    pop()
    
  
  }

  generatePoints() {
    this.type = type_selector.value()
    this.mosaicism_level = mosaicism_selector.value() / 100
    if (this.type === "Allosomes") {
      this.generateAllosomes();
    } else if (this.type === "X chromosome (if XY fetus)") {
      this.generateXYFetus();
    } else if (this.type === "Maternal Heterotrisomy") {
      this.generateMaternalHeterotrisomy();
    } else if (this.type === "Maternal Isotrisomy") {
      this.generateMaternalIsotrisomy();
    } else if (this.type === "Paternal Heterotrisomy") {
      this.generatePaternalHeterotrisomy();
    } else if (this.type === "Paternal Isotrisomy") {
      this.generatePaternalIsotrisomy();
    } else if (this.type === "Maternal Deletion") {
      this.generateMaternalDeletion();
    } else if (this.type === "Paternal Deletion") {
      this.generatePaternalDeletion();
    }
    
    this.lines = this.get_line_values(this.B_fetus, this.Total_fetus, this.B_mother, this.Total_mother, this.mosaicism_level)
    this.createPoints()
  }

  // Function to generate points for Allosomes
  generateAllosomes() {
    this.B_fetus = [2, 2, 1, 1, 1, 0, 0]
    this.Total_fetus = [2, 2, 2, 2, 2, 2, 2]
    this.B_mother = [2, 1, 2, 1, 0, 1, 0]
    this.Total_mother = [2, 2, 2, 2, 2, 2, 2]
  }

  // Function to generate points for X chromosome (if XY fetus)
  generateXYFetus() {
    this.B_fetus = [1, 1, 0, 0]
    this.Total_fetus = [1, 1, 1, 1]
    this.B_mother = [2, 1, 1, 0]
    this.Total_mother = [2, 2, 2, 2]
  }

  // Function to generate points for Maternal Heterotrisomy
  generateMaternalHeterotrisomy() {
    this.B_fetus = [3, 2, 2, 1, 1, 0]
    this.Total_fetus = [3, 3, 3, 3, 3, 3]
    this.B_mother = [2, 2, 1, 1, 0, 0]
    this.Total_mother = [2, 2, 2, 2, 2, 2]
  }

  // Function to generate points for Maternal Isotrisomy
  generateMaternalIsotrisomy() {
    this.B_fetus = [3, 3, 2, 2, 1, 1, 0, 0]
    this.Total_fetus = [3, 3, 3, 3, 3, 3, 3, 3]
    this.B_mother = [2, 1, 2, 1, 1, 0, 1, 0]
    this.Total_mother = [2, 2, 2, 2, 2, 2, 2, 2]
  }

  // Function to generate points for Paternal Heterotrisomy
  generatePaternalHeterotrisomy() {
    this.B_fetus = [3, 3, 2, 2, 2, 1, 1, 1, 0, 0]
    this.Total_fetus = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    this.B_mother = [2, 1, 2, 1, 0, 2, 1, 0, 1, 0]
    this.Total_mother = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
  }

  // Function to generate points for Paternal Isotrisomy
  generatePaternalIsotrisomy() {
    this.B_fetus = [3, 3, 2, 2, 1, 1, 0, 0]
    this.Total_fetus = [3, 3, 3, 3, 3, 3, 3, 3]
    this.B_mother = [2, 1, 1, 0, 2, 1, 1, 0]
    this.Total_mother = [2, 2, 2, 2, 2, 2, 2, 2]
  }
  
  // Function to generate points for Maternal Deletion
  generateMaternalDeletion() {
    this.B_fetus = [1, 1, 1, 0, 0, 0]
    this.Total_fetus = [1, 1, 1, 1, 1, 1]
    this.B_mother = [2, 1, 0, 2, 1, 0]
    this.Total_mother = [2, 2, 2, 2, 2, 2]
  }

  // Function to generate points for Paternal Deletion
  generatePaternalDeletion() {
    this.B_fetus = [1, 1, 0, 0]
    this.Total_fetus = [1, 1, 1, 1]
    this.B_mother = [2, 1, 1, 0]
    this.Total_mother = [2, 2, 2, 2]
  }
  
  createPoints () {
    this.points = [];
    let number_of_lines = this.lines.length
    for (let i = 0; i < this.number_of_points; i++) {
      let x = i;
      let y = this.lines[Math.floor(Math.random() * number_of_lines)];
      this.points.push({ x: x, y: y + random(-jitter_amount, jitter_amount)});      
    }
    return this.points
  }
  
  get_line_values (B_fetus, Total_fetus, B_mother, Total_mother, mosaicism_level){
    let lines = []
    let n_lines = B_fetus.length
    for (let i = 0; i < n_lines; i++){
      lines.push(((1-mosaicism_level) * B_fetus[i] + mosaicism_level * B_mother[i]) / ((1-mosaicism_level) * Total_fetus[i] + mosaicism_level * Total_mother[i]) )
    }
    return lines
  }
}
