from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse, HTMLResponse
import cv2
from fastapi.middleware.cors import CORSMiddleware
import mediapipe as mp
from fastapi.responses import JSONResponse


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# MediaPipe setup
mp_holistic = mp.solutions.holistic
mp_drawing = mp.solutions.drawing_utils

def mediapipe_detection(frame):
    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
        # Convert color
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False
        
        # Make detections
        results = holistic.process(image)
        
        # Recolor back
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        
        return image, results

def generate_frames():
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        raise HTTPException(status_code=500, detail="Could not access webcam")
    
    try:
        while True:
            success, frame = cap.read()
            if not success:
                break
            
            # Process frame
            image, results = mediapipe_detection(frame)
            
            # Draw landmarks if results exist
            if results.pose_landmarks:
                mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS)
            
            # Encode frame
            ret, buffer = cv2.imencode('.jpg', image)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    finally:
        cap.release()

@app.get("/", response_class=HTMLResponse)
async def home():
    return """
    <html>
        <head>
            <title>VietNam Sign Language Recognition</title>
        </head>
        <body>
            <h1>VietNam Sign Language Recognition</h1>
            <img src="/video_feed" width="640" height="480">
        </body>
    </html>
    """
    
# Add health check endpoint
@app.get("/health")
async def health_check():
    try:
        # Test camera access
        cap = cv2.VideoCapture(0)
        if not cap.isOpened():
            raise HTTPException(status_code=503, detail="Camera not accessible")
        cap.release()
        
        return JSONResponse(
            status_code=200,
            content={"status": "healthy", "message": "Backend is running"}
        )
    except Exception as e:
        raise HTTPException(
            status_code=503, 
            detail=f"Service unhealthy: {str(e)}"
        )

@app.get("/video_feed")
async def video_feed():
    return StreamingResponse(generate_frames(), media_type="multipart/x-mixed-replace; boundary=frame")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)