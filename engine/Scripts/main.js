document.addEventListener("click", startFullscreenAndAudio);
    
        const songs = ["Audio/lovestheme.mp3", "Audio/next-song.mp3", "Audio/song3.mp3"]; // Add more songs here
        let currentSongIndex = 0;
    
        function startFullscreenAndAudio() {
            const audio = document.getElementById("background-audio");
    
            // Request fullscreen
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.log("Fullscreen error:", err);
                });
            }
    
            // Play the first audio
            audio.src = songs[currentSongIndex];
            audio.play().catch(error => console.log("Autoplay blocked:", error));
    
            // Update "Now Playing" text when the audio starts
            updateNowPlaying(audio.src);
    
            // Ensure "Now Playing" updates every time the audio plays
            audio.addEventListener("play", function () {
                updateNowPlaying(audio.src);
            });
    
            // When the audio ends, switch to the next song
            audio.addEventListener("ended", function () {
                currentSongIndex = (currentSongIndex + 1) % songs.length;
                audio.src = songs[currentSongIndex];
                audio.play().catch(error => console.log("Error playing next song:", error));
                updateNowPlaying(audio.src);
            });
    
            // Remove event listener after first click
            document.removeEventListener("click", startFullscreenAndAudio);
    
            // Hide popup and overlay if they exist
            const popup = document.getElementById("fullscreenPopup");
            const overlay = document.getElementById("overlay");
            if (popup) popup.style.display = "none";
            if (overlay) overlay.style.display = "none";
        }
    
        function updateNowPlaying(audioSrc) {
            const nowPlayingText = document.getElementById("now-playing");
    
            if (!audioSrc) {
                nowPlayingText.innerHTML = "🎵 Now Playing: None";
                return;
            }
    
            // Extract filename from path (remove directories & file extension)
            const filename = audioSrc.split('/').pop().split('.').shift().replace(/_/g, ' ');
    
            // Update the now-playing element
        }
// Track selections for each category
const selectedItems = {
    skin: null,
    eyes: { type: null, color: null },
    mouth: null,
    brows: null,
    blush: { type: null, color: null },
    bangs: { type: null, color: null },
    hair: { type: null, color: null },
    tops: { type: null, color: null },
    skirts: { type: null, color: null },
    dresses: { type: null, color: null },
    jackets: { type: null, color: null },
    socks: { type: null, color: null },
    shoes: { type: null, color: null },
    legwarmers: { type: null, color: null },
    acc1: { type: null, color: null },
    acc2: {
        selected: new Set(),  // For multiple accessories
        color: null
    }
};

// Generic function to update selected item visual feedback
function updateSelectedVisual(elementId, className) {
    // Remove previous selection highlight
    const previousSelected = document.querySelector(`.${className}`);
    if (previousSelected) {
        previousSelected.classList.remove(className);
    }
    
    // Add highlight to new selection
    if (elementId) {
        const newSelected = document.querySelector(`[data-id="${elementId}"]`);
        if (newSelected) {
            newSelected.classList.add(className);
        }
    }
}

// Function to update image layer
function updateLayer(layerId, imagePath) {
    const layer = document.getElementById(layerId);
    if (layer) {
        layer.src = imagePath;
    }
}

// Example function for skin selection (single selection)
function selectSkin(skinId) {
    selectedItems.skin = skinId;
    updateSelectedVisual(skinId, 'skin-selected');
    updateLayer('base-layer', `Resources/in game/Body+Colors/${skinId}.png`);
}


// Function to select eye type
function selectEyeType(typeId) {
    // Remove previous selection highlight
    const previousType = document.querySelector('.eye-type-selected');
    if (previousType) {
        previousType.classList.remove('eye-type-selected');
    }

    // Add highlight to new selection
    const selectedType = document.querySelector(`[data-eye="${typeId}"]`);
    selectedType.classList.add('eye-type-selected');

    // Update selected type
    selectedItems.eyes.type = typeId;

    // Update eye layer if both type and color are selected
    updateEyeLayer();
}

// Function to select eye color
function selectEyeColor(colorId) {
    // Remove previous selection highlight
    const previousColor = document.querySelector('.eye-color-selected');
    if (previousColor) {
        previousColor.classList.remove('eye-color-selected');
    }

    // Add highlight to new selection
    const selectedColor = document.querySelector(`[data-color="${colorId}"]`);
    selectedColor.classList.add('eye-color-selected');

    // Update selected color
    selectedItems.eyes.color = colorId;

    // Update eye layer if both type and color are selected
    updateEyeLayer();
}

// Function to update the eye layer
function updateEyeLayer() {
    if (selectedItems.eyes.type && selectedItems.eyes.color) {
        const eyeLayer = document.getElementById('eyes-layer');
        eyeLayer.src = `Resources/in game/Eyes/${selectedItems.eyes.type}_${selectedItems.eyes.color}.png`;
    }
}

// Function to select mouth
function selectMouth(mouthId) {
    // Remove previous selection highlight
    const previousMouth = document.querySelector('.mouth-selected');
    if (previousMouth) {
        previousMouth.classList.remove('mouth-selected');
    }

    // Add highlight to new selection
    const selectedMouth = document.querySelector(`[data-mouth="${mouthId}"]`);
    selectedMouth.classList.add('mouth-selected');

    // Update mouth layer
    const mouthLayer = document.getElementById('mouth-layer');
    mouthLayer.src = `Resources/in game/Mouth/${mouthId}.png`;

    // Update selected items tracker
    selectedItems.mouth = mouthId;
}


// Function to select brows
function selectBrows(browsId) {
    // Remove previous selection highlight
    const previousBrows = document.querySelector('.brows-selected');
    if (previousBrows) {
        previousBrows.classList.remove('brows-selected');
    }

    // Add highlight to new selection
    const selectedBrows = document.querySelector(`[data-brows="${browsId}"]`);
    selectedBrows.classList.add('brows-selected');

    // Update brows layer
    const browsLayer = document.getElementById('brows-layer');
    browsLayer.src = `Resources/in game/Brows/${browsId}.png`;

    // Update selected items tracker
    selectedItems.brows = browsId;
}

// Function to select blush type
function selectBlushType(typeId) {
    // Remove previous selection highlight
    const previousType = document.querySelector('.blush-type-selected');
    if (previousType) {
        previousType.classList.remove('blush-type-selected');
    }

    // Add highlight to new selection
    const selectedType = document.querySelector(`[data-blush="${typeId}"]`);
    selectedType.classList.add('blush-type-selected');

    // Update selected type
    selectedItems.blush.type = typeId;

    // Update blush layer if both type and color are selected
    updateBlushLayer();
}

// Function to select blush color
function selectBlushColor(colorId) {
    // Remove previous selection highlight
    const previousColor = document.querySelector('.blush-color-selected');
    if (previousColor) {
        previousColor.classList.remove('blush-color-selected');
    }

    // Add highlight to new selection
    const selectedColor = document.querySelector(`[data-color="${colorId}"]`);
    selectedColor.classList.add('blush-color-selected');

    // Update selected color
    selectedItems.blush.color = colorId;

    // Update blush layer if both type and color are selected
    updateBlushLayer();
}

// Function to update the blush layer
function updateBlushLayer() {
    if (selectedItems.blush.type && selectedItems.blush.color) {
        const blushLayer = document.getElementById('blush-layer');
        blushLayer.src = `Resources/in game/Blush/${selectedItems.blush.type}_${selectedItems.blush.color}.png`;
    }
}


// Function to select bangs type
function selectBangsType(typeId) {
    // Remove previous selection highlight
    const previousType = document.querySelector('.bangs-type-selected');
    if (previousType) {
        previousType.classList.remove('bangs-type-selected');
    }

    // Add highlight to new selection
    const selectedType = document.querySelector(`[data-bangs="${typeId}"]`);
    selectedType.classList.add('bangs-type-selected');

    selectedItems.bangs.type = typeId;
    updateBangsLayer();
}

// Function to select bangs color
function selectBangsColor(colorCode) {
    // Remove previous selection highlight
    const previousColor = document.querySelector('.bangs-color-selected');
    if (previousColor) {
        previousColor.classList.remove('bangs-color-selected');
    }

    // Add highlight to new selection
    const selectedColor = document.querySelector(`[data-color="${colorCode}"]`);
    selectedColor.classList.add('bangs-color-selected');

    selectedItems.bangs.color = colorCode;
    updateBangsLayer();
}

// Function to update the bangs layer
function updateBangsLayer() {
    if (selectedItems.bangs.type && selectedItems.bangs.color) {
        const bangsLayer = document.getElementById('bangs-layer');
        bangsLayer.src = `Resources/in game/Bangs/${selectedItems.bangs.type}${selectedItems.bangs.color}.png`;
    }
}


function selectHairType(typeId) {
    const previousType = document.querySelector('.hair-type-selected');
    if (previousType) {
        previousType.classList.remove('hair-type-selected');
    }
    const selectedType = document.querySelector(`[data-hair="${typeId}"]`);
    selectedType.classList.add('hair-type-selected');
    selectedItems.hair.type = typeId;
    updateHairLayer();
}

function selectHairColor(colorCode) {
    const previousColor = document.querySelector('.hair-color-selected');
    if (previousColor) {
        previousColor.classList.remove('hair-color-selected');
    }
    const selectedColor = document.querySelector(`[data-color="${colorCode}"]`);
    selectedColor.classList.add('hair-color-selected');
    selectedItems.hair.color = colorCode;
    updateHairLayer();
}

function updateHairLayer() {
    if (selectedItems.hair.type && selectedItems.hair.color) {
        const hairLayer = document.getElementById('hair-layer');
        hairLayer.src = `Resources/in game/Hair/${selectedItems.hair.type}${selectedItems.hair.color}.png`;
    }
}
// Update the color selection functions
function selectBangsColor(colorCode) {
    const previousColor = document.querySelector('.bangs-color-selected');
    if (previousColor) {
        previousColor.classList.remove('bangs-color-selected');
    }
    const selectedColor = document.querySelector(`.bangs-grid-small [data-color="${colorCode}"]`);
    if (selectedColor) {
        selectedColor.classList.add('bangs-color-selected');
        selectedItems.bangs.color = colorCode;
        updateBangsLayer();
    }
}

function selectHairColor(colorCode) {
    const previousColor = document.querySelector('.hair-color-selected');
    if (previousColor) {
        previousColor.classList.remove('hair-color-selected');
    }
    const selectedColor = document.querySelector(`.hair-grid-small [data-color="${colorCode}"]`);
    if (selectedColor) {
        selectedColor.classList.add('hair-color-selected');
        selectedItems.hair.color = colorCode;
        updateHairLayer();
    }
}


function selectTopsType(typeId) {
    const previousType = document.querySelector('.tops-type-selected');
    if (previousType) {
        previousType.classList.remove('tops-type-selected');
    }
    const selectedType = document.querySelector(`[data-tops="${typeId}"]`);
    selectedType.classList.add('tops-type-selected');
    selectedItems.tops.type = typeId;
    updateTopsLayer();
}

function selectTopsColor(colorCode) {
    const previousColor = document.querySelector('.tops-color-selected');
    if (previousColor) {
        previousColor.classList.remove('tops-color-selected');
    }
    const selectedColor = document.querySelector(`.tops-grid-small [data-color="${colorCode}"]`);
    if (selectedColor) {
        selectedColor.classList.add('tops-color-selected');
        selectedItems.tops.color = colorCode;
        updateTopsLayer();
    }
}

function updateTopsLayer() {
    if (selectedItems.tops.type && selectedItems.tops.color) {
        const topsLayer = document.getElementById('tops-layer');
        topsLayer.src = `Resources/in game/Tops/${selectedItems.tops.type}${selectedItems.tops.color}.png`;
    }
}


function selectSkirtsType(typeId) {
    const previousType = document.querySelector('.skirts-type-selected');
    if (previousType) {
        previousType.classList.remove('skirts-type-selected');
    }
    const selectedType = document.querySelector(`[data-skirts="${typeId}"]`);
    selectedType.classList.add('skirts-type-selected');
    selectedItems.skirts.type = typeId;
    updateSkirtsLayer();
}

function selectSkirtsColor(colorCode) {
    const previousColor = document.querySelector('.skirts-color-selected');
    if (previousColor) {
        previousColor.classList.remove('skirts-color-selected');
    }
    const selectedColor = document.querySelector(`.skirts-grid-small [data-color="${colorCode}"]`);
    if (selectedColor) {
        selectedColor.classList.add('skirts-color-selected');
        selectedItems.skirts.color = colorCode;
        updateSkirtsLayer();
    }
}

function updateSkirtsLayer() {
    if (selectedItems.skirts.type && selectedItems.skirts.color) {
        const skirtsLayer = document.getElementById('skirts-layer');
        skirtsLayer.src = `Resources/in game/Skirts/${selectedItems.skirts.type}${selectedItems.skirts.color}.png`;
    }
}


function selectDressesType(typeId) {
    const previousType = document.querySelector('.dresses-type-selected');
    if (previousType) {
        previousType.classList.remove('dresses-type-selected');
    }
    const selectedType = document.querySelector(`[data-dresses="${typeId}"]`);
    selectedType.classList.add('dresses-type-selected');
    selectedItems.dresses.type = typeId;
    updateDressesLayer();
}

function selectDressesColor(colorCode) {
    const previousColor = document.querySelector('.dresses-color-selected');
    if (previousColor) {
        previousColor.classList.remove('dresses-color-selected');
    }
    const selectedColor = document.querySelector(`.dresses-grid-small [data-color="${colorCode}"]`);
    if (selectedColor) {
        selectedColor.classList.add('dresses-color-selected');
        selectedItems.dresses.color = colorCode;
        updateDressesLayer();
    }
}

function updateDressesLayer() {
    if (selectedItems.dresses.type && selectedItems.dresses.color) {
        const dressesLayer = document.getElementById('dresses-layer');
        dressesLayer.src = `Resources/in game/Dresses/${selectedItems.dresses.type}${selectedItems.dresses.color}.png`;
    }
}

function selectJacketsType(typeId) {
    const previousType = document.querySelector('.jackets-type-selected');
    if (previousType) {
        previousType.classList.remove('jackets-type-selected');
    }
    const selectedType = document.querySelector(`[data-jackets="${typeId}"]`);
    selectedType.classList.add('jackets-type-selected');
    selectedItems.jackets.type = typeId;
    updateJacketsLayer();
}

function selectJacketsColor(colorCode) {
    const previousColor = document.querySelector('.jackets-color-selected');
    if (previousColor) {
        previousColor.classList.remove('jackets-color-selected');
    }
    const selectedColor = document.querySelector(`.jackets-grid-small [data-color="${colorCode}"]`);
    if (selectedColor) {
        selectedColor.classList.add('jackets-color-selected');
        selectedItems.jackets.color = colorCode;
        updateJacketsLayer();
    }
}

function updateJacketsLayer() {
    if (selectedItems.jackets.type && selectedItems.jackets.color) {
        const jacketsLayer = document.getElementById('jackets-layer');
        jacketsLayer.src = `Resources/in game/Jackets/${selectedItems.jackets.type}${selectedItems.jackets.color}.png`;
    }
}

function selectSocksType(typeId) {
    const previousType = document.querySelector('.socks-type-selected');
    if (previousType) {
        previousType.classList.remove('socks-type-selected');
    }
    const selectedType = document.querySelector(`[data-socks="${typeId}"]`);
    selectedType.classList.add('socks-type-selected');
    selectedItems.socks.type = typeId;
    updateSocksLayer();
}

function selectSocksColor(colorCode) {
    const previousColor = document.querySelector('.socks-color-selected');
    if (previousColor) {
        previousColor.classList.remove('socks-color-selected');
    }
    const selectedColor = document.querySelector(`.socks-grid-small [data-color="${colorCode}"]`);
    if (selectedColor) {
        selectedColor.classList.add('socks-color-selected');
        selectedItems.socks.color = colorCode;
        updateSocksLayer();
    }
}

function updateSocksLayer() {
    if (selectedItems.socks.type && selectedItems.socks.color) {
        const socksLayer = document.getElementById('socks-layer');
        socksLayer.src = `Resources/in game/Socks/${selectedItems.socks.type}${selectedItems.socks.color}.png`;
    }
}


function selectShoesType(typeId) {
    const previousType = document.querySelector('.shoes-type-selected');
    if (previousType) {
        previousType.classList.remove('shoes-type-selected');
    }
    const selectedType = document.querySelector(`[data-shoes="${typeId}"]`);
    selectedType.classList.add('shoes-type-selected');
    selectedItems.shoes.type = typeId;
    updateShoesLayer();
}

function selectShoesColor(colorCode) {
    const previousColor = document.querySelector('.shoes-color-selected');
    if (previousColor) {
        previousColor.classList.remove('shoes-color-selected');
    }
    const selectedColor = document.querySelector(`.shoes-grid-small [data-color="${colorCode}"]`);
    if (selectedColor) {
        selectedColor.classList.add('shoes-color-selected');
        selectedItems.shoes.color = colorCode;
        updateShoesLayer();
    }
}

function updateShoesLayer() {
    if (selectedItems.shoes.type && selectedItems.shoes.color) {
        const shoesLayer = document.getElementById('shoes-layer');
        shoesLayer.src = `Resources/in game/Shoes/${selectedItems.shoes.type}${selectedItems.shoes.color}.png`;
    }
}



function selectLegWarmersType(typeId) {
    const previousType = document.querySelector('.legwarmers-type-selected');
    if (previousType) {
        previousType.classList.remove('legwarmers-type-selected');
    }
    const selectedType = document.querySelector(`[data-legwarmers="${typeId}"]`);
    selectedType.classList.add('legwarmers-type-selected');
    selectedItems.legwarmers.type = typeId;
    updateLegWarmersLayer();
}

function selectLegWarmersColor(colorCode) {
    const previousColor = document.querySelector('.legwarmers-color-selected');
    if (previousColor) {
        previousColor.classList.remove('legwarmers-color-selected');
    }
    const selectedColor = document.querySelector(`.legwarmers-grid-small [data-color="${colorCode}"]`);
    if (selectedColor) {
        selectedColor.classList.add('legwarmers-color-selected');
        selectedItems.legwarmers.color = colorCode;
        updateLegWarmersLayer();
    }
}

function updateLegWarmersLayer() {
    if (selectedItems.legwarmers.type && selectedItems.legwarmers.color) {
        const legwarmersLayer = document.getElementById('legwarmers-layer');
        legwarmersLayer.src = `Resources/in game/Legwarmers/${selectedItems.legwarmers.type}${selectedItems.legwarmers.color}.png`;
    }
}
// ...existing code...

// Accessories Selection Functions
function selectAcc1Type(type) {
    const acc1Layer = document.getElementById('acc1-layer');
    selectedAcc1Type = type;
    updateAcc1Layer();
}

function selectAcc1Color(color) {
    selectedAcc1Color = color;
    updateAcc1Layer();
}

function updateAcc1Layer() {
    const acc1Layer = document.getElementById('acc1-layer');
    if (selectedAcc1Type && selectedAcc1Color) {
        acc1Layer.src = `Resources/in game/Accessories1/${selectedAcc1Type}${selectedAcc1Color}.png`;
    }
}

function selectAcc1Type(type) {
    // Remove previous selection
    const previousType = document.querySelector('.acc1-type-selected');
    if (previousType) {
        previousType.classList.remove('acc1-type-selected');
    }
    
    // Add selection to new item
    const selectedType = document.querySelector(`[data-acc1="${type}"]`);
    if (selectedType) {
        selectedType.classList.add('acc1-type-selected');
        selectedItems.acc1.type = type;
        updateAcc1Layer();
    }
}

function selectAcc1Color(color) {
    // Remove previous selection
    const previousColor = document.querySelector('.acc1-color-selected');
    if (previousColor) {
        previousColor.classList.remove('acc1-color-selected');
    }
    
    // Add selection to new item
    const selectedColor = document.querySelector(`.accessories1-grid-small [data-color="${color}"]`);
    if (selectedColor) {
        selectedColor.classList.add('acc1-color-selected');
        selectedItems.acc1.color = color;
        updateAcc1Layer();
    }
}

function updateAcc1Layer() {
    if (selectedItems.acc1.type && selectedItems.acc1.color) {
        const acc1Layer = document.getElementById('acc1-layer');
        acc1Layer.src = `Resources/in game/Accessories1/${selectedItems.acc1.type}${selectedItems.acc1.color}.png`;
    }
}

function selectAcc2Type(type) {
    const acc1Layer = document.getElementById('acc2-layer');
    selectedAcc2Type = type;
    updateAcc1Layer();
}

function selectAcc2Color(color) {
    selectedAcc2Color = color;
    updateAcc1Layer();
}

function updateAcc2Layer() {
    const acc2Layer = document.getElementById('acc2-layer');
    if (selectedAcc2Type && selectedAcc2Color) {
        acc2Layer.src = `Resources/in game/Accessories2/${selectedAcc2Type}${selectedAcc2color}.png`;
    }
}

function selectAcc2Type(type) {
    // Remove previous selection
    const previousType = document.querySelector('.acc2-type-selected');
    if (previousType) {
        previousType.classList.remove('acc2-type-selected');
    }
    
    // Add selection to new item
    const selectedType = document.querySelector(`[data-acc2="${type}"]`);
    if (selectedType) {
        selectedType.classList.add('acc2-type-selected');
        selectedItems.acc2.type = type;
        updateAcc1Layer();
    }
}

function selectAcc2Color(color) {
    // Remove previous selection
    const previousColor = document.querySelector('.acc2-color-selected');
    if (previousColor) {
        previousColor.classList.remove('acc2-color-selected');
    }
    
    // Add selection to new item
    const selectedColor = document.querySelector(`.accessories2-grid-small [data-color="${color}"]`);
    if (selectedColor) {
        selectedColor.classList.add('acc2-color-selected');
        selectedItems.acc2.color = color;
        updateAcc2Layer();
    }
}

function updateAcc2Layer() {
    if (selectedItems.acc2.type && selectedItems.acc2.color) {
        const acc2Layer = document.getElementById('acc2-layer');
        acc2Layer.src = `Resources/in game/Accessories2/${selectedItems.acc2.type}${selectedItems.acc2.color}.png`;
    }
}

let isBlushVisible = true; // Add this with other state variables at the top

function toggleBlush() {
    const blushLayer = document.getElementById('blush-layer');
    const blushToggle = document.getElementById('blush-toggle');
    
    isBlushVisible = !isBlushVisible;
    
    if (isBlushVisible) {
        blushLayer.src = 'Resources/in game/Blush/q1.png';
        blushToggle.classList.add('blush-selected');
    } else {
        blushLayer.src = 'Resources/placeholder.png';
        blushToggle.classList.remove('blush-selected');
    }
}

function resetSection(sectionType) {
    // Remove selected classes
    const typeSelected = document.querySelector(`.${sectionType}-type-selected`);
    const colorSelected = document.querySelector(`.${sectionType}-color-selected`);
    
    if (typeSelected) {
        typeSelected.classList.remove(`${sectionType}-type-selected`);
    }
    if (colorSelected) {
        colorSelected.classList.remove(`${sectionType}-color-selected`);
    }
    
    // Reset the layer image
    const layer = document.getElementById(`${sectionType}-layer`);
    if (layer) {
        layer.src = 'Resources/placeholder.png';
    }
    
    // Reset selected items state
    if (selectedItems[sectionType]) {
        selectedItems[sectionType].type = null;
        selectedItems[sectionType].color = null;
    }
}

const themes = [
    'Casual Day',
'Weekend Chill',
'Grocery Run',
'Coffee Run',
'Park Stroll',
'Movie Night',
'Sleepover Vibes',
'Road Trip',
'Study Session',
'Outdoor Adventure',
'Market Visit',
'Errand Run',
'Museum Visit',
'Gym Wear',
'Rainy Day',
'Friends Hangout',
'Casual Chic',
'Street Style',
'Night Out',
'Retro Vibes',
'Minimalist Look',
'Smart Casual',
'Trendy Layers',
'Summer Cool',
'Winter Cozy',
'Edgy Fashion',
'Vintage Glam',
'Sporty Wear',
'Polished Casual',
'Preppy Style',
'Artistic Flair',
'Monochrome Mood',
'Chic Elegance',
];

function setRandomTheme() {
    const randomIndex = Math.floor(Math.random() * themes.length);
    const themeDisplay = document.getElementById('current-theme');
    themeDisplay.textContent = themes[randomIndex];
}

// Call when page loads
window.addEventListener('load', setRandomTheme);

// Add at the end of your JavaScript file

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('download-btn');
    const modal = document.getElementById('download-modal');
    const closeBtn = document.getElementById('close-modal');
    const downloadCreationBtn = document.getElementById('download-creation');

    // Show modal
    downloadBtn.onclick = function() {
        console.log('Opening modal');
        modal.style.display = 'block';
        captureCreation();
    }

    // Close modal
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    // Download creation
    downloadCreationBtn.onclick = function() {
        downloadImage();
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});

// Capture the creation
function captureCreation() {
    console.log('Capturing creation');
    const leftFrame = document.querySelector('.left-frame');
    html2canvas(leftFrame).then(canvas => {
        const previewContainer = document.querySelector('.preview-container');
        previewContainer.innerHTML = '';
        previewContainer.appendChild(canvas);
    }).catch(error => {
        console.error('Error capturing creation:', error);
    });
}

// Download the image
function downloadImage() {
    const canvas = document.querySelector('.preview-container canvas');
    if (canvas) {
        const link = document.createElement('a');
        link.download = 'my-creation.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
}

function captureCreation() {
    console.log('Capturing creation');
    const leftFrame = document.querySelector('.left-frame');
    
    html2canvas(leftFrame).then(canvas => {
        // Create a new scaled canvas
        const scaledCanvas = document.createElement('canvas');
        const ctx = scaledCanvas.getContext('2d');
        
        // Scale down by 60%
        const scaleFactor = 0.4; // 1 - 0.6 = 0.4 (40% of original size)
        scaledCanvas.width = canvas.width * scaleFactor;
        scaledCanvas.height = canvas.height * scaleFactor;
        
        // Draw scaled image
        ctx.drawImage(canvas, 
            0, 0, canvas.width, canvas.height,
            0, 0, scaledCanvas.width, scaledCanvas.height
        );
        
        // Show preview
        const previewContainer = document.querySelector('.preview-container');
        previewContainer.innerHTML = '';
        previewContainer.appendChild(scaledCanvas);
    }).catch(error => {
        console.error('Error capturing creation:', error);
    });
}

// Update the download function to use the scaled canvas
function downloadImage() {
    const canvas = document.querySelector('.preview-container canvas');
    if (canvas) {
        const link = document.createElement('a');
        link.download = 'my-creation.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
}
function captureCreation() {
    console.log('Capturing creation');
    const leftFrame = document.querySelector('.left-frame');
    const themeDisplay = leftFrame.querySelector('.theme-display');
    const downloadBtn = leftFrame.querySelector('.download-button');
    
    // Temporarily hide theme and button
    themeDisplay.style.display = 'none';
    downloadBtn.style.display = 'none';
    
    html2canvas(leftFrame).then(canvas => {
        // Create a new scaled canvas
        const scaledCanvas = document.createElement('canvas');
        const ctx = scaledCanvas.getContext('2d');
        
        // Scale down by 60%
        const scaleFactor = 0.4;
        scaledCanvas.width = canvas.width * scaleFactor;
        scaledCanvas.height = canvas.height * scaleFactor;
        
        // Draw scaled image
        ctx.drawImage(canvas, 
            0, 0, canvas.width, canvas.height,
            0, 0, scaledCanvas.width, scaledCanvas.height
        );
        
        // Show preview
        const previewContainer = document.querySelector('.preview-container');
        previewContainer.innerHTML = '';
        previewContainer.appendChild(scaledCanvas);
        
        // Show theme and button again
        themeDisplay.style.display = 'block';
        downloadBtn.style.display = 'block';
    }).catch(error => {
        console.error('Error capturing creation:', error);
        // Ensure elements are visible even if capture fails
        themeDisplay.style.display = 'block';
        downloadBtn.style.display = 'block';
    });
}

function captureCreation() {
    console.log('Capturing creation');
    const leftFrame = document.querySelector('.left-frame');
    const themeDisplay = leftFrame.querySelector('.theme-display');
    const downloadBtn = leftFrame.querySelector('.download-button');
    
    // Temporarily hide theme and button
    themeDisplay.style.display = 'none';
    downloadBtn.style.display = 'none';
    
    html2canvas(leftFrame).then(canvas => {
        // Create a new scaled canvas
        const scaledCanvas = document.createElement('canvas');
        const ctx = scaledCanvas.getContext('2d');
        
        // Scale down by 60%
        const scaleFactor = 0.4;
        scaledCanvas.width = canvas.width * scaleFactor;
        scaledCanvas.height = canvas.height * scaleFactor;
        
        // Draw scaled image
        ctx.drawImage(canvas, 
            0, 0, canvas.width, canvas.height,
            0, 0, scaledCanvas.width, scaledCanvas.height
        );
        
        // Show preview
        const previewContainer = document.querySelector('.preview-container');
        previewContainer.innerHTML = '';
        previewContainer.appendChild(scaledCanvas);
        
        // Adjust container size to match canvas exactly
        previewContainer.style.width = scaledCanvas.width + 'px';
        previewContainer.style.height = scaledCanvas.height + 'px';
        
        // Show theme and button again
        themeDisplay.style.display = 'block';
        downloadBtn.style.display = 'block';
    }).catch(error => {
        console.error('Error capturing creation:', error);
        themeDisplay.style.display = 'block';
        downloadBtn.style.display = 'block';
    });
}


function toggleAcc2(type) {
    const selectedType = document.querySelector(`[data-acc2="${type}"]`);
    
    if (selectedType) {
        if (selectedItems.acc2.selected.has(type)) {
            // Remove if already selected
            selectedItems.acc2.selected.delete(type);
            selectedType.classList.remove('acc2-type-selected');
            removeAcc2Layer(type);
        } else {
            // Add if not selected
            selectedItems.acc2.selected.add(type);
            selectedType.classList.add('acc2-type-selected');
            updateAcc2Layer(type);
        }
    }
}

function updateAcc2Layer(type) {
    if (selectedItems.acc2.color) {
        const layerId = `acc2-${type}-layer`;
        let layer = document.getElementById(layerId);
        
        if (!layer) {
            layer = document.createElement('img');
            layer.id = layerId;
            layer.className = 'layer-img';
            layer.style.zIndex = '5';
            document.querySelector('.left-frame').appendChild(layer);
        }
        
        layer.src = `Resources/in game/Accessories2/${type}${selectedItems.acc2.color}.png`;
    }
}

function removeAcc2Layer(type) {
    const layer = document.getElementById(`acc2-${type}-layer`);
    if (layer) {
        layer.remove();
    }
}

function selectAcc2Color(color) {
    const previousColor = document.querySelector('.acc2-color-selected');
    if (previousColor) {
        previousColor.classList.remove('acc2-color-selected');
    }
    
    const selectedColor = document.querySelector(`.accessories2-grid-small [data-color="${color}"]`);
    if (selectedColor) {
        selectedColor.classList.add('acc2-color-selected');
        selectedItems.acc2.color = color;
        
        selectedItems.acc2.selected.forEach(type => {
            updateAcc2Layer(type);
        });
    }
}