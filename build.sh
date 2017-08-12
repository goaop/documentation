# Clean up all previously generated files

rm -R ./_static/*
rm -R ./_build/doctrees/*
rm -R ./_build/html/*

# Build assets

./node_modules/.bin/encore production

# Build documentation

make html