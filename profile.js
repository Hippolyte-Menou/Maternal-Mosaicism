let centromeres = [
	[0.48, 0.59], // Chromosome 1
	[0.37, 0.4], // Chromosome 2
	[0.45, 0.48], // Chromosome 3
	[0.25, 0.28], // Chromosome 4
	[0.25, 0.28], // Chromosome 5
	[0.34, 0.37], // Chromosome 6
	[0.36, 0.4], // Chromosome 7
	[0.29, 0.33], // Chromosome 8
	[0.27, 0.49], // Chromosome 9
	[0.28, 0.32], // Chromosome 10
	[0.38, 0.41], // Chromosome 11
	[0.25, 0.29], // Chromosome 12
	[0.0, 0.17], // Chromosome 13
	[0.0, 0.19], // Chromosome 14
	[0.0, 0.2], // Chromosome 15
	[0.38, 0.52], // Chromosome 16
	[0.27, 0.32], // Chromosome 17
	[0.19, 0.24], // Chromosome 18
	[0.41, 0.48], // Chromosome 19
	[0.41, 0.48], // Chromosome 20
	[0.0, 0.21], // Chromosome 21
	[0.0, 0.34], // Chromosome 22
	[0.37, 0.4], // Chromosome X
	[0.48, 1.0], // Chromosome Y
]

let jitter_amount = 0.01


class Profile {
  constructor(type) {
    this.type = type
    this.chromosome = chromosome
    this.mosaicism_level = mosaicism_level
    
    this.lines = [];
    this.points = [];
    this.number_of_points = 2000;
    this.generatePoints();
    
  }

  display() {
    push()
    stroke(0, 0, 255);
    strokeWeight(3)
    
    for (let p of this.points) {
      // Exclude points within centromeres and short arms of acrocentric chromosomes
      if (p.x < centromeres[this.chromosome - 1][0]*this.number_of_points || p.x > centromeres[this.chromosome - 1][1]*this.number_of_points){
        let x = map(p.x, 0, this.number_of_points, left_of_graph, width - right_of_graph)
        let y = map(p.y, 0, 1, height - bottom_of_graph, top_of_graph);
        point(x, y);
      }
    }
    pop()
    
    push()
    
    for (let l of this.lines){
      strokeWeight(3)
      let y = map(l, 0, 1, height - bottom_of_graph, top_of_graph);
      line(width-right_of_graph, y, width-right_of_graph+5, y); // ticks
      textAlign(CENTER, CENTER)
      strokeWeight(1)
      text(l.toFixed(3), width - right_of_graph + 25, y);
    }
    pop()
   
  }

  generatePoints() {
    console.log("generatePoints")
    this.type = type_selector.value()
    this.mosaicism_level = mosaicism_selector.value() / 100
    console.log(this.type)
    console.log(this.mosaicism_level)
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
    console.log(this.points)
    for (let i = 0; i < this.points.length; i++) {
      this.points[i][1] = this.points[i][1] 
    }
    console.log(this.chromosome - 1)
    console.log(centromeres[this.chromosome - 1])
  }

  // Function to generate points for Allosomes
  generateAllosomes() {
    
    let B_fetus = [2, 2, 1, 1, 1, 0, 0]
    let Total_fetus = [2, 2, 2, 2, 2, 2, 2]
    let B_mother = [2, 1, 2, 1, 0, 1, 0]
    let Total_mother = [2, 2, 2, 2, 2, 2, 2]

    this.lines = this.get_line_values(B_fetus, Total_fetus, B_mother, Total_mother)
    this.createPoints()
  }

  // Function to generate points for X chromosome (if XY fetus)
  generateXYFetus() {
    let B_fetus = [1, 1, 0, 0]
    let Total_fetus = [1, 1, 1, 1]
    let B_mother = [2, 1, 1, 0]
    let Total_mother = [2, 2, 2, 2]

    this.lines = this.get_line_values(B_fetus, Total_fetus, B_mother, Total_mother)
    this.createPoints()
  }

  // Function to generate points for Maternal Heterotrisomy
  generateMaternalHeterotrisomy() {
    let B_fetus = [3, 2, 2, 1, 1, 0]
    let Total_fetus = [3, 3, 3, 3, 3, 3]
    let B_mother = [2, 2, 1, 1, 0, 0]
    let Total_mother = [2, 2, 2, 2, 2, 2]

    this.lines = this.get_line_values(B_fetus, Total_fetus, B_mother, Total_mother)
    this.createPoints()
  }

  // Function to generate points for Maternal Isotrisomy
  generateMaternalIsotrisomy() {
    let B_fetus = [3, 3, 2, 2, 1, 1, 0, 0]
    let Total_fetus = [3, 3, 3, 3, 3, 3, 3, 3]
    let B_mother = [2, 1, 2, 1, 1, 0, 1, 0]
    let Total_mother = [2, 2, 2, 2, 2, 2, 2, 2]

    this.lines = this.get_line_values(B_fetus, Total_fetus, B_mother, Total_mother)
    this.createPoints()
  }

  // Function to generate points for Paternal Heterotrisomy
  generatePaternalHeterotrisomy() {
    let B_fetus = [3, 3, 2, 2, 2, 1, 1, 1, 0, 0]
    let Total_fetus = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    let B_mother = [2, 1, 2, 1, 0, 2, 1, 0, 1, 0]
    let Total_mother = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]

    this.lines = this.get_line_values(B_fetus, Total_fetus, B_mother, Total_mother)
    this.createPoints()
  }

  // Function to generate points for Paternal Isotrisomy
  generatePaternalIsotrisomy() {
    let B_fetus = [3, 3, 2, 2, 1, 1, 0, 0]
    let Total_fetus = [3, 3, 3, 3, 3, 3, 3, 3]
    let B_mother = [2, 1, 1, 0, 2, 1, 1, 0]
    let Total_mother = [2, 2, 2, 2, 2, 2, 2, 2]

    this.lines = this.get_line_values(B_fetus, Total_fetus, B_mother, Total_mother)
    this.createPoints()
  }
  
  // Function to generate points for Maternal Deletion
  generateMaternalDeletion() {
    let B_fetus = [1, 1, 1, 0, 0, 0]
    let Total_fetus = [1, 1, 1, 1, 1, 1]
    let B_mother = [2, 1, 0, 2, 1, 0]
    let Total_mother = [2, 2, 2, 2, 2, 2]

    this.lines = this.get_line_values(B_fetus, Total_fetus, B_mother, Total_mother)
    this.createPoints()
  }

  // Function to generate points for Paternal Deletion
  generatePaternalDeletion() {
    let B_fetus = [1, 1, 0, 0]
    let Total_fetus = [1, 1, 1, 1]
    let B_mother = [2, 1, 1, 0]
    let Total_mother = [2, 2, 2, 2]

    this.lines = this.get_line_values(B_fetus, Total_fetus, B_mother, Total_mother)
    this.createPoints()    
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
  
  get_line_values (B_fetus, Total_fetus, B_mother, Total_mother){
    let lines = []
    let n_lines = B_fetus.length
    for (let i = 0; i < n_lines; i++){
      lines.push(((1-this.mosaicism_level) * B_fetus[i] + this.mosaicism_level * B_mother[i]) / ((1-this.mosaicism_level) * Total_fetus[i] + this.mosaicism_level * Total_mother[i]) )
    }
    console.log(lines)
    return lines
  }
}
