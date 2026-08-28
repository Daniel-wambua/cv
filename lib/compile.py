import argparse
import logging
import os
import shutil
import subprocess
import sys
from colorama import init, Fore

# Initialize colorama
init(autoreset=True)

print(f"{Fore.CYAN}➡️ Starting: Compiling LaTex files into a PDF")

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

def compile_latex(input_tex: str, output_pdf: str, timeout: int = 60) -> bool:
    """
    Compiles a LaTeX file into a PDF using xelatex.

    Args:
        input_tex (str): The path to the input LaTeX (.tex) file.
        output_pdf (str): The path to the output PDF file.
        timeout (int): The timeout in seconds for the LaTeX compilation process.

    Returns:
        bool: True if the PDF was generated, False otherwise.
    """
    try:
        input_dir = os.path.dirname(input_tex)
        output_dir = os.path.dirname(output_pdf)
        base_name = os.path.basename(input_tex).replace('.tex', '.pdf')
        
        logger.info(f"Compiling {input_tex} to PDF...")

        # Change to the directory containing the input .tex file
        compile_cmd = ['xelatex', '-interaction=nonstopmode', os.path.basename(input_tex)]
        result = subprocess.run(compile_cmd, check=False, capture_output=True, text=True, timeout=timeout, cwd=input_dir)

        # Check if PDF was generated (xelatex can return non-zero exit code with warnings but still produce PDF)
        compiled_pdf_path = os.path.join(input_dir, base_name)
        if os.path.exists(compiled_pdf_path):
            logger.info("PDF generated successfully (with warnings)." if result.returncode != 0 else "Compilation successful.")
            # Ensure the output directory exists
            if not os.path.exists(output_dir):
                os.makedirs(output_dir)
            # Move the generated PDF to the desired output path
            # (shutil.move, not os.rename, so cross-device outputs work)
            shutil.move(compiled_pdf_path, output_pdf)
            print(f"{Fore.GREEN}✅ Success: PDF generated at {output_pdf}")
            if result.returncode != 0:
                logger.warning("XeLaTeX exited with warnings (non-zero exit code). Check compilation log for details.")
            return True
        else:
            logger.error("Compilation failed - no PDF generated.")
            print(f"{Fore.RED}❌ Error: Compilation failed.")
            print(result.stdout)
            print(result.stderr)
            return False
    except subprocess.CalledProcessError as e:
        logger.error(f"Compilation failed: {e}")
        print(f"{Fore.RED}❌ Error: Compilation failed: {e}")
        return False
    except subprocess.TimeoutExpired as e:
        logger.error("Compilation process timed out.")
        print(f"{Fore.RED}❌ Error: Compilation process timed out.")
        return False
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        print(f"{Fore.RED}❌ Error: Unexpected error: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description="Compile a LaTeX file into a PDF.")
    parser.add_argument('--input', required=True, help="Path to the input LaTeX (.tex) file")
    parser.add_argument('--output', required=True, help="Path to the output PDF file")
    
    args = parser.parse_args()
    
    input_tex = args.input
    output_pdf = args.output
    
    if not os.path.isfile(input_tex):
        logger.error(f"Input file not found: {input_tex}")
        print(f"{Fore.RED}❌ Error: Input file not found: {input_tex}")
        sys.exit(1)

    if not output_pdf.endswith('.pdf'):
        logger.error("Output file must have a .pdf extension")
        print(f"{Fore.RED}❌ Error: Output file must have a .pdf extension")
        sys.exit(1)

    success = compile_latex(input_tex, output_pdf)
    if not success:
        # Surface failures to the shell so build scripts and CI don't
        # silently ship a stale PDF
        sys.exit(1)

if __name__ == '__main__':
    main()
