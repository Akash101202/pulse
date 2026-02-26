import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  text: {
    lineHeight: 1.5,
  },
});

export default function ResumeDocument({ resume }: any) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {resume.basics?.fullName}
          </Text>
          <Text style={styles.title}>
            {resume.basics?.title}
          </Text>
        </View>

        {/* Summary */}
        {resume.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.text}>
              {resume.summary}
            </Text>
          </View>
        )}

      </Page>
    </Document>
  );
}