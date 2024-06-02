let profile;
let type_selector;

let chromosome_selector;
let chromosome = 1;
let chromosome_image;
let chromosome_images;

let bottom = 50

let height_of_graph = 600

let top_of_graph = 170;
let left_of_graph = 70;
let bottom_of_graph = top_of_graph + height_of_graph;
let right_of_graph = 150;

let chromosome_height = 100;
let chromosome_dy = 100;

let mosaicism_level

function preload() {
  chromosome_images = {
    "1": loadImage("chromosomes/chromosome_1.png"), 
    "2": loadImage("chromosomes/chromosome_2.png"),
    "3": loadImage("chromosomes/chromosome_3.png"),
    "4": loadImage("chromosomes/chromosome_4.png"),
    "5": loadImage("chromosomes/chromosome_5.png"),
    "6": loadImage("chromosomes/chromosome_6.png"),
    "7": loadImage("chromosomes/chromosome_7.png"),
    "8": loadImage("chromosomes/chromosome_8.png"),
    "9": loadImage("chromosomes/chromosome_9.png"),
    "10": loadImage("chromosomes/chromosome_10.png"),
    "11": loadImage("chromosomes/chromosome_11.png"),
    "12": loadImage("chromosomes/chromosome_12.png"),
    "13": loadImage("chromosomes/chromosome_13.png"),
    "14": loadImage("chromosomes/chromosome_14.png"),
    "15": loadImage("chromosomes/chromosome_15.png"),
    "16": loadImage("chromosomes/chromosome_16.png"),
    "17": loadImage("chromosomes/chromosome_17.png"),
    "18": loadImage("chromosomes/chromosome_18.png"),
    "19": loadImage("chromosomes/chromosome_19.png"),
    "20": loadImage("chromosomes/chromosome_20.png"),
    "21": loadImage("chromosomes/chromosome_21.png"),
    "22": loadImage("chromosomes/chromosome_22.png"),
    "X": loadImage("chromosomes/chromosome_X.png"),
    "Y": loadImage("chromosomes/chromosome_Y.png")
};
}

function setup() {
  let canvas = createCanvas(800, 1400);
  canvas.position(100, 100)
  create_mosaicism_selector()
  create_case_selector()
  create_chromosome_selector()
  
  let sidebar_text = createP("Maternal contamination in amniotic fluid samples poses a significant challenge to prenatal SNP array analysis. Using an a priori approach based on calculated levels of AA, AB, BB (AAA, AAB, ABB, BBB) genotypes, we can determine the level of maternal contamination found on SNP-array")
  sidebar_text.position(930, 130)
  
}

function draw() {
  background(255);
  strokeWeight(1)
  
  draw_scales()
  draw_chromosome()
  
  write_selector_line()

  profile.display()
  
  line(left_of_graph, height - bottom_of_graph + 30, width - right_of_graph + 60, height - bottom_of_graph + 30) // Line separating top graph and bottom graph
  
  write_second_graph()

}

function create_mosaicism_selector(){
  mosaicism_selector = createSelect();
  mosaicism_selector.position(620, 107)
  mosaicism_options = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]
  for (let mosaicism_option of mosaicism_options){mosaicism_selector.option(mosaicism_option);}
  style_mosaic_selector()
  mosaicism_selector.changed(update_points)
}

function create_chromosome_selector(){
  chromosome_selector = createSelect();
  chromosome_selector.position(830, 107)
  style_chromosome_selector()
  chromosome_options = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "X", "Y"]

  for (let chromosome_option of chromosome_options){chromosome_selector.option(chromosome_option)}
  chromosome_selector.changed(update_chromosome)
  update_chromosome()

}

function create_case_selector(){
  type_selector = createSelect();
  type_selector.position(230, 107);
  type_options = ["Allosomes", "X chromosome (if XY fetus)", "Maternal Heterotrisomy", "Maternal Isotrisomy", "Paternal Heterotrisomy", "Paternal Isotrisomy", "Maternal Deletion", "Paternal Deletion"]
  
  for (let type_option of type_options) {type_selector.option(type_option);}
  style_type_selector()
  profile = new Profile(type_selector.value());
  type_selector.changed(update_points);
}

function draw_scales(){
  draw_vertical_scale()
  draw_horizontal_scale()
}

function draw_vertical_scale(){
  push()
  stroke(0);
  // Vertical scale
  line(left_of_graph, top_of_graph, left_of_graph, height - bottom_of_graph); // Y-axis
  pop()
  
  push()
  textSize(14)
  textAlign(CENTER, CENTER);
  let BAF_letters = ["BB", "AB", "AA"]
  for (let i of [0, 0.5, 1] ) {
    let y = map(i, 0, 1, height - bottom_of_graph, top_of_graph);
    text(i, left_of_graph-20, y); // 
    line(left_of_graph-5, y, left_of_graph, y); // ticks
    text(BAF_letters[i*2], left_of_graph-40, y); // Label ticks
  }
  pop()
  
  // Label Vertical scale
  push();
  translate(10, (height - bottom_of_graph - top_of_graph) / 2 + top_of_graph);
  rotate(-PI / 2);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Bi-allellic Frequency", 0, 0);
  translate(-680, 0)
  text("Bi-allellic Frequency", 0, 0); // Second graph
  pop();
}

function draw_horizontal_scale(){ 
  // Draw axes
  push();
  stroke(0);
  line(left_of_graph, height - bottom_of_graph, width - right_of_graph, height - bottom_of_graph ); // X-axis
  pop()
}

function update_points(){
  profile.generatePoints();
}

function draw_chromosome(){
  push();
  imageMode(CENTER);
  translate(width / 2 - left_of_graph / 2, chromosome_dy);
  rotate(-HALF_PI);
  
  image(chromosome_image, 0, 0, chromosome_height, width - left_of_graph - right_of_graph);
  pop();
}

function write_selector_line(){
  push()
  textAlign(LEFT, CENTER)
  textSize(18)
  text("SNP profile of ", 20, 20)
  text(" for a mosaïcism of ", 365, 20)
  text("% of chromosome ", 580, 20)
  pop()
}

function write_second_graph(){
  push()
  textAlign(CENTER, CENTER)
  textSize(28)
  text("For a given level of maternal contamination, \nwhere are the expected lines on SNP array", width / 2, height - bottom_of_graph + 70)
  pop()
  
  push()
  textAlign(CENTER, CENTER)
  textStyle(BOLD)
  textSize(20)
  text("Maternal contamination", width / 2, height - bottom_of_graph + 130)
  pop()
  
  push()
  textAlign(CENTER, CENTER)
  textStyle(ITALIC)
  textSize(16)
  text("Key of interpretation : for a SNP profile of allosomes and a maternal contamination of 30%, \n7 lines are expected at [0, 0.15, 0.35, 0.5, 0.65, 0.85, 1] on BAF graph ", width / 2, height - 25)
  pop()
}

function update_chromosome(){
  profile.chromosome = chromosome_selector.value()
  chromosome_image = chromosome_images[profile.chromosome]
  profile.generatePoints();
}

function style_chromosome_selector(){
  chromosome_selector.style("border", "none")
  chromosome_selector.style("border-bottom", "1px solid black") 
  chromosome_selector.style("background", "none")
  chromosome_selector.style("color", "black")
  chromosome_selector.style("font-size", "18px") 

}

function style_type_selector(){
  type_selector.style("border", "none")
  type_selector.style("border-bottom", "1px solid black")
  type_selector.style("background", "none")
  type_selector.style("font-size", "18px") 
}

function style_mosaic_selector(){
  mosaicism_selector.style("border", "none")
  mosaicism_selector.style("border-bottom", "1px solid black")
  mosaicism_selector.style("background", "none")
  mosaicism_selector.style("font-size", "18px") 

 
}
