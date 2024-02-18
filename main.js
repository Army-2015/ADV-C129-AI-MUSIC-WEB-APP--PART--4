var song_status = "";
var song1_status = "";
var song2_status = "";
var leftWristX = 0;
var rightWristX = 0;
var leftWristY = 0;
var rightWristY = 0;
var score_leftWrist = 0;

function preload(){
    piano_music_song1 = loadSound("piano_music.mp3");
    guitar_music_song2 = loadSound("guitar_music.mp3");
}

function setup(){
    canvas = createCanvas(450, 450);
    canvas.position(530, 455);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded(){
    console.log("Model is Loaded !");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X position = " + leftWristX + ", Left Wrist Y position = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X position = " + rightWristX + ", Right Wrist Y position = " + rightWristY);

        score_leftWrist = results[0].pose.keypoints[9].score;
    }
}

function draw(){
    image(video, 0, 0, 450, 450);

    song1_status = piano_music_song1.isPlaying() 
    
    fill("#FF0000");
    stroke("#FF0000");
    if(score_leftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        guitar_music_song2.stop()
        if(song1_status = "false")
        {
            piano_music_song1.play();
            document.getElementById("song_btn").innerHTML = "Piano music playing!";
        }
    }
}