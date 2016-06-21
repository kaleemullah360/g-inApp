#!/home/superuser/.rbenv/shims/ruby
require 'rubygems'
require 'openssl'
require 'base64'

def main
  raise ArgumentError, 'Require receipt, signature and public key to run' unless ARGV.length == 3

  #read files
  receipt = read_file(ARGV[0])
  signature = read_file(ARGV[1])
  base64_encoded_public_key = read_file(ARGV[2])

  #decode public key from Base64 string
  #public_key = OpenSSL::PKey::RSA.new base64_encoded_public_key
  public_key = OpenSSL::PKey::RSA.new(Base64.decode64(base64_encoded_public_key))

  #verify the signature digest was encrypted with priv key & matches digest for receipt string
  verified = public_key.verify(OpenSSL::Digest::SHA1.new, Base64.decode64(signature), receipt)

  print "Wow... thats #{verified}-ly amazing\n"
end

def read_file(file_name)
  File.read(file_name)
end

if __FILE__ == $0
  main()
end
