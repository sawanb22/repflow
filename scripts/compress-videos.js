const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Directory paths
const RAW_DIR = path.join(__dirname, "..", "staging", "raw-videos");
const OPTIMIZED_DIR = path.join(__dirname, "..", "staging", "optimized-videos");
const PUBLIC_EXERCISES_DIR = path.join(__dirname, "..", "public", "exercises");

// Helper to check if a command exists in PATH
function commandExists(cmd) {
  try {
    execSync(process.platform === "win32" ? `where ${cmd}` : `which ${cmd}`, { stdio: "ignore" });
    return true;
  } catch (e) {
    return false;
  }
}

// Main execution function
function main() {
  console.log("\n=== RepFlow Exercise Video Compression Utility ===\n");

  // 1. Ensure required directories exist
  [RAW_DIR, OPTIMIZED_DIR, PUBLIC_EXERCISES_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${path.relative(path.join(__dirname, ".."), dir)}`);
    }
  });

  // 2. Check if FFmpeg is installed
  if (!commandExists("ffmpeg")) {
    console.error("❌ Error: FFmpeg is not installed or not in your system's PATH.\n");
    console.log("To install FFmpeg on Windows, please run this command in an Administrator PowerShell:");
    console.log("👉 winget install Gyan.FFmpeg\n");
    console.log("After installation completes, please RESTART your terminal/VS Code and try again.");
    process.exit(1);
  }

  // 3. Scan for raw videos
  const files = fs.readdirSync(RAW_DIR).filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return [".mp4", ".mov", ".avi", ".mkv"].includes(ext);
  });

  if (files.length === 0) {
    console.log("ℹ️ No raw video files found in staging/raw-videos/");
    console.log("👉 Please drop your raw exercise videos there (named exactly like exercise slugs, e.g. 'push-up.mp4') and run this script again.");
    console.log("\nStaging Folder Path: " + RAW_DIR);
    process.exit(0);
  }

  console.log(`Found ${files.length} raw video(s) to process...\n`);

  let successCount = 0;
  let failCount = 0;

  files.forEach((file, index) => {
    const slug = path.basename(file, path.extname(file));
    const inputPath = path.join(RAW_DIR, file);
    
    // Staged optimized file
    const optimizedOutputPath = path.join(OPTIMIZED_DIR, `${slug}.mp4`);
    
    // Destination folder inside public for direct local Next.js preview
    const localExerciseDir = path.join(PUBLIC_EXERCISES_DIR, slug);
    const localVideoOutputPath = path.join(localExerciseDir, "animation.mp4");

    console.log(`[${index + 1}/${files.length}] Processing: ${file}`);
    console.log(`  -> Exercise Slug: ${slug}`);

    // Create the exercise-specific folder in public if it doesn't exist
    if (!fs.existsSync(localExerciseDir)) {
      fs.mkdirSync(localExerciseDir, { recursive: true });
    }

    // FFmpeg compression command:
    // -y: overwrite output files
    // -an: strip audio track (removes 20-35% file size)
    // -vcodec libx264: H.264 video codec for maximum compatibility
    // -crf 26: Constant Rate Factor balancing high quality with low size
    // -preset slower: Spends more compression time to squeeze out every byte
    // -vf "scale=480:600...": scale to 480x600 portrait resolution with black letterboxes/pillarboxes to fit cards
    // -movflags +faststart: Moves metadata atom to front for instant streaming play
    const scaleFilter = "scale=480:600:force_original_aspect_ratio=decrease,pad=480:600:(ow-iw)/2:(oh-ih)/2:color=black";
    const ffmpegCommand = `ffmpeg -y -i "${inputPath}" -an -vcodec libx264 -crf 26 -preset slower -vf "${scaleFilter}" -movflags +faststart "${optimizedOutputPath}"`;

    try {
      console.log("  ⌛ Compressing video (this may take a few seconds)...");
      execSync(ffmpegCommand, { stdio: "ignore" });

      // Copy the optimized video to the Next.js public directory for instant local testing
      fs.copyFileSync(optimizedOutputPath, localVideoOutputPath);

      const inputSizeKB = Math.round(fs.statSync(inputPath).size / 1024);
      const outputSizeKB = Math.round(fs.statSync(optimizedOutputPath).size / 1024);
      const savingsPct = Math.round(((inputSizeKB - outputSizeKB) / inputSizeKB) * 100);

      console.log(`  ✅ Successfully compressed!`);
      console.log(`     Original size: ${inputSizeKB} KB`);
      console.log(`     Compressed size: ${outputSizeKB} KB (Saved ${savingsPct}%)`);
      console.log(`     Saved locally to: ${path.relative(path.join(__dirname, ".."), localVideoOutputPath)}\n`);
      successCount++;
    } catch (error) {
      console.error(`  ❌ FFmpeg compression failed for ${file}`);
      console.error(`     Make sure the input file is not corrupted.\n`);
      failCount++;
    }
  });

  console.log("=== Compression Summary ===");
  console.log(`Processed: ${files.length} videos`);
  console.log(`Successful: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  console.log("\n👉 Upload the contents of 'staging/optimized-videos/' directly to your Cloudflare R2 bucket once ready!");
  console.log("👉 The local optimized copies are already placed in public/exercises/ and are ready for local app testing.");
}

main();
